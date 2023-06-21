"""Test Playground."""

from typing import List

import pytest
from llama_index.embeddings.base import BaseEmbedding

from llama_index.indices.list.base import GPTListIndex
from llama_index.indices.service_context import ServiceContext
from llama_index.indices.tree.base import GPTTreeIndex
from llama_index.indices.vector_store.base import GPTVectorStoreIndex
from llama_index.playground import DEFAULT_INDEX_CLASSES, DEFAULT_MODES, Playground
from llama_index.readers.schema.base import Document


class MockEmbedding(BaseEmbedding):
    def _get_text_embedding(self, text: str) -> List[float]:
        """Mock get text embedding."""
        # assume dimensions are 5
        if text == "They're taking the Hobbits to Isengard!":
            return [1, 0, 0, 0, 0]
        elif text == "I can't carry it for you.":
            return [0, 1, 0, 0, 0]
        elif text == "But I can carry you!":
            return [0, 0, 1, 0, 0]
        else:
            raise ValueError("Invalid text for `mock_get_text_embedding`.")

    def _get_query_embedding(self, query: str) -> List[float]:
        """Mock get query embedding."""
        del query
        return [0, 0, 1, 0, 0]


def test_get_set_compare(
    mock_service_context: ServiceContext,
) -> None:
    """Test basic comparison of indices."""
    mock_service_context.embed_model = MockEmbedding()
    documents = [Document("They're taking the Hobbits to Isengard!")]

    indices = [
        GPTVectorStoreIndex.from_documents(
            documents=documents, service_context=mock_service_context
        ),
        GPTListIndex.from_documents(documents, service_context=mock_service_context),
        GPTTreeIndex.from_documents(
            documents=documents, service_context=mock_service_context
        ),
    ]

    playground = Playground(indices=indices)  # type: ignore

    assert len(playground.indices) == 3

    results = playground.compare("Who is?", to_pandas=False)
    assert len(results) > 0
    assert len(results) <= 3 * len(DEFAULT_MODES)

    playground.indices = [
        GPTVectorStoreIndex.from_documents(
            documents=documents, service_context=mock_service_context
        )
    ]

    assert len(playground.indices) == 1


def test_from_docs(
    mock_service_context: ServiceContext,
) -> None:
    """Test initialization via a list of documents."""
    mock_service_context.embed_model = MockEmbedding()
    documents = [
        Document("I can't carry it for you."),
        Document("But I can carry you!"),
    ]

    playground = Playground.from_docs(
        documents=documents, service_context=mock_service_context
    )

    assert len(playground.indices) == len(DEFAULT_INDEX_CLASSES)
    assert len(playground.retriever_modes) == len(DEFAULT_MODES)

    with pytest.raises(ValueError):
        playground = Playground.from_docs(
            documents=documents,
            retriever_modes={},
            service_context=mock_service_context,
        )


def test_validation() -> None:
    """Test validation of indices and modes."""
    with pytest.raises(ValueError):
        _ = Playground(indices=["GPTVectorStoreIndex"])  # type: ignore

    with pytest.raises(ValueError):
        _ = Playground(
            indices=[GPTVectorStoreIndex, GPTListIndex, GPTTreeIndex]  # type: ignore
        )

    with pytest.raises(ValueError):
        _ = Playground(indices=[])  # type: ignore

    with pytest.raises(TypeError):
        _ = Playground(retriever_modes={})  # type: ignore
