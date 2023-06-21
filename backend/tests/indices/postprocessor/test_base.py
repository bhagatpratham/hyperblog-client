"""Node postprocessor tests."""

from pathlib import Path
import pytest
from llama_index.storage.docstore.simple_docstore import SimpleDocumentStore

from llama_index.indices.query.schema import QueryBundle
from llama_index.prompts.prompts import Prompt, SimpleInputPrompt
from llama_index.indices.service_context import ServiceContext
from llama_index.data_structs.node import Node, DocumentRelationship, NodeWithScore
from llama_index.indices.postprocessor.node import (
    PrevNextNodePostprocessor,
    KeywordNodePostprocessor,
)
from llama_index.indices.postprocessor.node_recency import (
    FixedRecencyPostprocessor,
    EmbeddingRecencyPostprocessor,
    TimeWeightedPostprocessor,
)
from llama_index.llm_predictor import LLMPredictor
from unittest.mock import patch
from llama_index.embeddings.openai import OpenAIEmbedding
from typing import List, Any, Tuple, cast, Dict


def mock_get_text_embedding(text: str) -> List[float]:
    """Mock get text embedding."""
    # assume dimensions are 5
    if text == "Hello world.":
        return [1, 0, 0, 0, 0]
    elif text == "This is a test.":
        return [0, 1, 0, 0, 0]
    elif text == "This is another test.":
        return [0, 0, 1, 0, 0]
    elif text == "This is a test v2.":
        return [0, 0, 0, 1, 0]
    elif text == "This is a test v3.":
        return [0, 0, 0, 0, 1]
    elif text == "This is bar test.":
        return [0, 0, 1, 0, 0]
    elif text == "Hello world backup.":
        # this is used when "Hello world." is deleted.
        return [1, 0, 0, 0, 0]
    else:
        raise ValueError("Invalid text for `mock_get_text_embedding`.")


def mock_get_text_embeddings(texts: List[str]) -> List[List[float]]:
    """Mock get text embeddings."""
    return [mock_get_text_embedding(text) for text in texts]


def mock_get_query_embedding(query: str) -> List[float]:
    """Mock get query embedding."""
    return mock_get_text_embedding(query)


def test_forward_back_processor(tmp_path: Path) -> None:
    """Test forward-back processor."""

    nodes = [
        Node("Hello world.", doc_id="1"),
        Node("This is a test.", doc_id="2"),
        Node("This is another test.", doc_id="3"),
        Node("This is a test v2.", doc_id="4"),
    ]
    nodes_with_scores = [NodeWithScore(node) for node in nodes]
    for i, node in enumerate(nodes):
        if i > 0:
            node.relationships.update(
                {DocumentRelationship.PREVIOUS: nodes[i - 1].get_doc_id()},
            )
        if i < len(nodes) - 1:
            node.relationships.update(
                {DocumentRelationship.NEXT: nodes[i + 1].get_doc_id()},
            )

    docstore = SimpleDocumentStore()
    docstore.add_documents(nodes)

    # check for a single node
    node_postprocessor = PrevNextNodePostprocessor(
        docstore=docstore, num_nodes=2, mode="next"
    )
    processed_nodes = node_postprocessor.postprocess_nodes([nodes_with_scores[0]])
    assert len(processed_nodes) == 3
    assert processed_nodes[0].node.get_doc_id() == "1"
    assert processed_nodes[1].node.get_doc_id() == "2"
    assert processed_nodes[2].node.get_doc_id() == "3"

    # check for multiple nodes (nodes should not be duped)
    node_postprocessor = PrevNextNodePostprocessor(
        docstore=docstore, num_nodes=1, mode="next"
    )
    processed_nodes = node_postprocessor.postprocess_nodes(
        [nodes_with_scores[1], nodes_with_scores[2]]
    )
    assert len(processed_nodes) == 3
    assert processed_nodes[0].node.get_doc_id() == "2"
    assert processed_nodes[1].node.get_doc_id() == "3"
    assert processed_nodes[2].node.get_doc_id() == "4"

    # check for previous
    node_postprocessor = PrevNextNodePostprocessor(
        docstore=docstore, num_nodes=1, mode="previous"
    )
    processed_nodes = node_postprocessor.postprocess_nodes(
        [nodes_with_scores[1], nodes_with_scores[2]]
    )
    assert len(processed_nodes) == 3
    assert processed_nodes[0].node.get_doc_id() == "1"
    assert processed_nodes[1].node.get_doc_id() == "2"
    assert processed_nodes[2].node.get_doc_id() == "3"

    # check that both works
    node_postprocessor = PrevNextNodePostprocessor(
        docstore=docstore, num_nodes=1, mode="both"
    )
    processed_nodes = node_postprocessor.postprocess_nodes([nodes_with_scores[2]])
    assert len(processed_nodes) == 3
    # nodes are sorted
    assert processed_nodes[0].node.get_doc_id() == "2"
    assert processed_nodes[1].node.get_doc_id() == "3"
    assert processed_nodes[2].node.get_doc_id() == "4"

    # check that num_nodes too high still works
    node_postprocessor = PrevNextNodePostprocessor(
        docstore=docstore, num_nodes=4, mode="both"
    )
    processed_nodes = node_postprocessor.postprocess_nodes([nodes_with_scores[2]])
    assert len(processed_nodes) == 4
    # nodes are sorted
    assert processed_nodes[0].node.get_doc_id() == "1"
    assert processed_nodes[1].node.get_doc_id() == "2"
    assert processed_nodes[2].node.get_doc_id() == "3"
    assert processed_nodes[3].node.get_doc_id() == "4"

    # check that raises value error for invalid mode
    with pytest.raises(ValueError):
        PrevNextNodePostprocessor(docstore=docstore, num_nodes=4, mode="asdfasdf")


def mock_recency_predict(prompt: Prompt, **prompt_args: Any) -> Tuple[str, str]:
    """Mock LLM predict."""
    if isinstance(prompt, SimpleInputPrompt):
        return "YES", "YES"
    else:
        raise ValueError("Invalid prompt type.")


@patch.object(LLMPredictor, "predict", side_effect=mock_recency_predict)
@patch.object(LLMPredictor, "__init__", return_value=None)
@patch.object(
    OpenAIEmbedding, "_get_text_embedding", side_effect=mock_get_text_embedding
)
@patch.object(
    OpenAIEmbedding, "_get_text_embeddings", side_effect=mock_get_text_embeddings
)
def test_fixed_recency_postprocessor(
    _mock_texts: Any, _mock_text: Any, _mock_init: Any, _mock_predict: Any
) -> None:
    """Test fixed recency processor."""

    # try in extra_info
    nodes = [
        Node("Hello world.", doc_id="1", extra_info={"date": "2020-01-01"}),
        Node("This is a test.", doc_id="2", extra_info={"date": "2020-01-02"}),
        Node("This is another test.", doc_id="3", extra_info={"date": "2020-01-03"}),
        Node("This is a test v2.", doc_id="4", extra_info={"date": "2020-01-04"}),
    ]
    node_with_scores = [NodeWithScore(node) for node in nodes]

    service_context = ServiceContext.from_defaults()

    postprocessor = FixedRecencyPostprocessor(top_k=1, service_context=service_context)
    query_bundle: QueryBundle = QueryBundle(query_str="What is?")
    result_nodes = postprocessor.postprocess_nodes(
        node_with_scores, query_bundle=query_bundle
    )
    assert len(result_nodes) == 1
    assert result_nodes[0].node.get_text() == "date: 2020-01-04\n\nThis is a test v2."

    # try in node info
    nodes = [
        Node("Hello world.", doc_id="1", node_info={"date": "2020-01-01"}),
        Node("This is a test.", doc_id="2", node_info={"date": "2020-01-02"}),
        Node("This is another test.", doc_id="3", node_info={"date": "2020-01-03"}),
        Node("This is a test v2.", doc_id="4", node_info={"date": "2020-01-04"}),
    ]
    node_with_scores = [NodeWithScore(node) for node in nodes]
    service_context = ServiceContext.from_defaults()

    postprocessor = FixedRecencyPostprocessor(
        top_k=1, service_context=service_context, in_extra_info=False
    )
    query_bundle = QueryBundle(query_str="What is?")
    result_nodes = postprocessor.postprocess_nodes(
        node_with_scores, query_bundle=query_bundle
    )
    assert len(result_nodes) == 1
    assert result_nodes[0].node.get_text() == "This is a test v2."


@patch.object(LLMPredictor, "predict", side_effect=mock_recency_predict)
@patch.object(LLMPredictor, "__init__", return_value=None)
@patch.object(
    OpenAIEmbedding, "_get_text_embedding", side_effect=mock_get_text_embedding
)
@patch.object(
    OpenAIEmbedding, "_get_text_embeddings", side_effect=mock_get_text_embeddings
)
@patch.object(
    OpenAIEmbedding, "get_query_embedding", side_effect=mock_get_query_embedding
)
def test_embedding_recency_postprocessor(
    _mock_query_embed: Any,
    _mock_texts: Any,
    _mock_text: Any,
    _mock_init: Any,
    _mock_predict: Any,
) -> None:
    """Test fixed recency processor."""

    # try in node info
    nodes = [
        Node("Hello world.", doc_id="1", node_info={"date": "2020-01-01"}),
        Node("This is a test.", doc_id="2", node_info={"date": "2020-01-02"}),
        Node("This is another test.", doc_id="3", node_info={"date": "2020-01-02"}),
        Node("This is another test.", doc_id="3v2", node_info={"date": "2020-01-03"}),
        Node("This is a test v2.", doc_id="4", node_info={"date": "2020-01-04"}),
    ]
    nodes_with_scores = [NodeWithScore(node) for node in nodes]
    service_context = ServiceContext.from_defaults()

    postprocessor = EmbeddingRecencyPostprocessor(
        top_k=1,
        service_context=service_context,
        in_extra_info=False,
        query_embedding_tmpl="{context_str}",
    )
    query_bundle: QueryBundle = QueryBundle(query_str="What is?")
    result_nodes = postprocessor.postprocess_nodes(
        nodes_with_scores, query_bundle=query_bundle
    )
    assert len(result_nodes) == 4
    assert result_nodes[0].node.get_text() == "This is a test v2."
    assert cast(Dict, result_nodes[0].node_info)["date"] == "2020-01-04"
    assert result_nodes[1].node.get_text() == "This is another test."
    assert result_nodes[1].node.get_doc_id() == "3v2"
    assert cast(Dict, result_nodes[1].node_info)["date"] == "2020-01-03"
    assert result_nodes[2].node.get_text() == "This is a test."
    assert cast(Dict, result_nodes[2].node_info)["date"] == "2020-01-02"


@patch.object(LLMPredictor, "predict", side_effect=mock_recency_predict)
@patch.object(LLMPredictor, "__init__", return_value=None)
@patch.object(
    OpenAIEmbedding, "_get_text_embedding", side_effect=mock_get_text_embedding
)
@patch.object(
    OpenAIEmbedding, "_get_text_embeddings", side_effect=mock_get_text_embeddings
)
@patch.object(
    OpenAIEmbedding, "get_query_embedding", side_effect=mock_get_query_embedding
)
def test_time_weighted_postprocessor(
    _mock_query_embed: Any,
    _mock_texts: Any,
    _mock_text: Any,
    _mock_init: Any,
    _mock_predict: Any,
) -> None:
    """Test time weighted processor."""

    key = "__last_accessed__"
    # try in extra_info
    nodes = [
        Node("Hello world.", doc_id="1", node_info={key: 0}),
        Node("This is a test.", doc_id="2", node_info={key: 1}),
        Node("This is another test.", doc_id="3", node_info={key: 2}),
        Node("This is a test v2.", doc_id="4", node_info={key: 3}),
    ]
    node_with_scores = [NodeWithScore(node) for node in nodes]

    # high time decay
    postprocessor = TimeWeightedPostprocessor(
        top_k=1, time_decay=0.99999, time_access_refresh=True, now=4.0
    )
    result_nodes_with_score = postprocessor.postprocess_nodes(node_with_scores)

    assert len(result_nodes_with_score) == 1
    assert result_nodes_with_score[0].node.get_text() == "This is a test v2."
    assert cast(Dict, nodes[0].node_info)[key] == 0
    assert cast(Dict, nodes[3].node_info)[key] != 3

    # low time decay
    # artifically make earlier nodes more relevant
    # therefore postprocessor should still rank earlier nodes higher
    nodes = [
        Node("Hello world.", doc_id="1", node_info={key: 0}),
        Node("This is a test.", doc_id="2", node_info={key: 1}),
        Node("This is another test.", doc_id="3", node_info={key: 2}),
        Node("This is a test v2.", doc_id="4", node_info={key: 3}),
    ]
    node_with_scores = [
        NodeWithScore(node, -float(idx)) for idx, node in enumerate(nodes)
    ]
    postprocessor = TimeWeightedPostprocessor(
        top_k=1, time_decay=0.000000000002, time_access_refresh=True, now=4.0
    )
    result_nodes_with_score = postprocessor.postprocess_nodes(node_with_scores)
    assert len(result_nodes_with_score) == 1
    assert result_nodes_with_score[0].node.get_text() == "Hello world."
    assert cast(Dict, nodes[0].node_info)[key] != 0
    assert cast(Dict, nodes[3].node_info)[key] == 3


def test_keyword_postprocessor() -> None:
    """Test keyword processor."""

    key = "__last_accessed__"
    # try in extra_info
    nodes = [
        Node("Hello world.", doc_id="1", node_info={key: 0}),
        Node("This is a test.", doc_id="2", node_info={key: 1}),
        Node("This is another test.", doc_id="3", node_info={key: 2}),
        Node("This is a test v2.", doc_id="4", node_info={key: 3}),
    ]
    node_with_scores = [NodeWithScore(node) for node in nodes]

    postprocessor = KeywordNodePostprocessor(required_keywords=["This"])
    new_nodes = postprocessor.postprocess_nodes(node_with_scores)
    assert new_nodes[0].node.get_text() == "This is a test."
    assert new_nodes[1].node.get_text() == "This is another test."
    assert new_nodes[2].node.get_text() == "This is a test v2."

    postprocessor = KeywordNodePostprocessor(required_keywords=["Hello"])
    new_nodes = postprocessor.postprocess_nodes(node_with_scores)
    assert new_nodes[0].node.get_text() == "Hello world."
    assert len(new_nodes) == 1

    postprocessor = KeywordNodePostprocessor(required_keywords=["is another"])
    new_nodes = postprocessor.postprocess_nodes(node_with_scores)
    assert new_nodes[0].node.get_text() == "This is another test."
    assert len(new_nodes) == 1

    # test exclude keywords
    postprocessor = KeywordNodePostprocessor(exclude_keywords=["is another"])
    new_nodes = postprocessor.postprocess_nodes(node_with_scores)
    assert new_nodes[1].node.get_text() == "This is a test."
    assert new_nodes[2].node.get_text() == "This is a test v2."
    assert len(new_nodes) == 3
