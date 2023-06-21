# Using with Langchain 🦜🔗

LlamaIndex provides both Tool abstractions for a Langchain agent as well as a memory module.

The API reference of the Tool abstractions + memory modules are [here](/reference/langchain_integrations/base.rst).


### Llama Tool abstractions
LlamaIndex provides Tool abstractions so that you can use LlamaIndex along with a Langchain agent. 

For instance, you can choose to create a "Tool" from an `QueryEngine` directly as follows:

```python
from llama_index.langchain_helpers.agents import IndexToolConfig, LlamaIndexTool

tool_config = IndexToolConfig(
    query_engine=query_engine, 
    name=f"Vector Index",
    description=f"useful for when you want to answer queries about X",
    tool_kwargs={"return_direct": True}
)

tool = LlamaIndexTool.from_tool_config(tool_config)

```

You can also choose to provide a `LlamaToolkit`:

```python
toolkit = LlamaToolkit(
    index_configs=index_configs,
)
```

Such a toolkit can be used to create a downstream Langchain-based chat agent through
our `create_llama_agent` and `create_llama_chat_agent` commands:

```python
from llama_index.langchain_helpers.agents import create_llama_chat_agent

agent_chain = create_llama_chat_agent(
    toolkit,
    llm,
    memory=memory,
    verbose=True
)

agent_chain.run(input="Query about X")
```

You can take a look at [the full tutorial notebook here](https://github.com/jerryjliu/llama_index/blob/main/examples/chatbot/Chatbot_SEC.ipynb).


### Llama Demo Notebook: Tool + Memory module

We provide another demo notebook showing how you can build a chat agent with the following components.
- Using LlamaIndex as a generic callable tool with a Langchain agent
- Using LlamaIndex as a memory module; this allows you to insert arbitrary amounts of conversation history with a Langchain chatbot!

Please see the [notebook here](https://github.com/jerryjliu/llama_index/blob/main/examples/langchain_demo/LangchainDemo.ipynb).