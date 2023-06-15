"""Default query for GPTEmptyIndex."""
from typing import Any, List, Optional
from llama_index.indices.base_retriever import BaseRetriever

from llama_index.data_structs.node import NodeWithScore
from llama_index.indices.query.schema import QueryBundle
from llama_index.prompts.default_prompts import DEFAULT_SIMPLE_INPUT_PROMPT
from llama_index.prompts.prompts import SimpleInputPrompt

from llama_index.indices.empty.base import GPTEmptyIndex


class EmptyIndexRetriever(BaseRetriever):
    """GPTEmptyIndex query.

    Passes the raw LLM call to the underlying LLM model.

    Args:
        input_prompt (Optional[SimpleInputPrompt]): A Simple Input Prompt
            (see :ref:`Prompt-Templates`).

    """

    def __init__(
        self,
        index: GPTEmptyIndex,
        input_prompt: Optional[SimpleInputPrompt] = None,
        **kwargs: Any,
    ) -> None:
        """Initialize params."""
        self._index = index
        self._input_prompt = input_prompt or DEFAULT_SIMPLE_INPUT_PROMPT

    def _retrieve(self, query_bundle: QueryBundle) -> List[NodeWithScore]:
        """Retrieve relevant nodes."""
        del query_bundle  # Unused
        return []
