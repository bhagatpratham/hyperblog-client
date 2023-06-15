import sys
from unittest.mock import MagicMock
from llama_index.data_structs.node import DocumentRelationship, Node
from llama_index.vector_stores.types import NodeWithEmbedding

from llama_index.vector_stores.weaviate import WeaviateVectorStore


def test_weaviate_add() -> None:
    # mock import
    sys.modules["weaviate"] = MagicMock()
    weaviate_client = MagicMock()
    batch_context_manager = MagicMock()
    weaviate_client.batch.__enter__.return_value = batch_context_manager

    vector_store = WeaviateVectorStore(weaviate_client=weaviate_client)

    vector_store.add(
        [
            NodeWithEmbedding(
                node=Node(
                    text="test node text",
                    doc_id="test node id",
                    relationships={DocumentRelationship.SOURCE: "test doc id"},
                ),
                embedding=[0.5, 0.5],
            )
        ]
    )

    args, _ = batch_context_manager.add_data_object.call_args
    assert args[-1] == [0.5, 0.5]
