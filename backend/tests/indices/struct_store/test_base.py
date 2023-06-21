"""Test struct store indices."""

from typing import Any, Dict, List, Tuple


from sqlalchemy import (
    Column,
    Integer,
    MetaData,
    String,
    Table,
    create_engine,
    delete,
    select,
)

from llama_index.indices.list.base import GPTListIndex
from llama_index.indices.query.schema import QueryBundle
from llama_index.indices.service_context import ServiceContext
from llama_index.indices.struct_store.sql import (
    GPTSQLStructStoreIndex,
    SQLContextContainerBuilder,
)
from llama_index.indices.struct_store.sql_query import GPTNLStructStoreQueryEngine
from llama_index.langchain_helpers.sql_wrapper import SQLDatabase
from llama_index.readers.schema.base import Document
from llama_index.schema import BaseDocument
from tests.mock_utils.mock_prompts import (
    MOCK_TABLE_CONTEXT_PROMPT,
)
from llama_index.data_structs.node import Node, DocumentRelationship


def _delete_table_items(engine: Any, table: Table) -> None:
    """Delete items from a table."""
    delete_stmt = delete(table)
    with engine.connect() as connection:
        connection.execute(delete_stmt)
        connection.commit()


def test_sql_index(
    mock_service_context: ServiceContext,
    struct_kwargs: Tuple[Dict, Dict],
) -> None:
    """Test GPTSQLStructStoreIndex."""
    engine = create_engine("sqlite:///:memory:")
    metadata_obj = MetaData()
    table_name = "test_table"
    test_table = Table(
        table_name,
        metadata_obj,
        Column("user_id", Integer, primary_key=True),
        Column("foo", String(16), nullable=False),
    )
    metadata_obj.create_all(engine)
    # NOTE: we can use the default output parser for this
    index_kwargs, _ = struct_kwargs
    docs = [Document(text="user_id:2,foo:bar"), Document(text="user_id:8,foo:hello")]
    sql_database = SQLDatabase(engine, metadata=metadata_obj)
    index = GPTSQLStructStoreIndex.from_documents(
        docs,
        sql_database=sql_database,
        table_name=table_name,
        service_context=mock_service_context,
        **index_kwargs
    )
    assert isinstance(index, GPTSQLStructStoreIndex)

    # test that the document is inserted
    stmt = select(test_table.c["user_id", "foo"])
    engine = index.sql_database.engine
    with engine.connect() as connection:
        results = connection.execute(stmt).fetchall()
        print(results)
        assert results == [(2, "bar"), (8, "hello")]

    # try with documents with more text chunks
    _delete_table_items(engine, test_table)
    docs = [Document(text="user_id:2,foo:bar\nuser_id:8,foo:hello")]
    index = GPTSQLStructStoreIndex.from_documents(
        docs, sql_database=sql_database, table_name=table_name, **index_kwargs
    )
    assert isinstance(index, GPTSQLStructStoreIndex)
    # test that the document is inserted
    stmt = select(test_table.c["user_id", "foo"])
    engine = index.sql_database.engine
    with engine.connect() as connection:
        results = connection.execute(stmt).fetchall()
        connection.commit()
        assert results == [(8, "hello")]


def test_sql_index_nodes(
    mock_service_context: ServiceContext,
    struct_kwargs: Tuple[Dict, Dict],
) -> None:
    """Test GPTSQLStructStoreIndex with nodes."""
    engine = create_engine("sqlite:///:memory:")
    metadata_obj = MetaData()
    table_name = "test_table"
    test_table = Table(
        table_name,
        metadata_obj,
        Column("user_id", Integer, primary_key=True),
        Column("foo", String(16), nullable=False),
    )
    metadata_obj.create_all(engine)
    # NOTE: we can use the default output parser for this
    index_kwargs, _ = struct_kwargs

    # try with different parent ids
    nodes = [
        Node(
            text="user_id:2,foo:bar",
            relationships={DocumentRelationship.SOURCE: "test"},
        ),
        Node(
            text="user_id:8,foo:hello",
            relationships={DocumentRelationship.SOURCE: "test2"},
        ),
    ]
    sql_database = SQLDatabase(engine, metadata=metadata_obj)
    index = GPTSQLStructStoreIndex(
        nodes,
        sql_database=sql_database,
        table_name=table_name,
        service_context=mock_service_context,
        **index_kwargs
    )
    assert isinstance(index, GPTSQLStructStoreIndex)

    # test that both nodes are inserted
    stmt = select(test_table.c["user_id", "foo"])
    engine = index.sql_database.engine
    with engine.connect() as connection:
        results = connection.execute(stmt).fetchall()
        print(results)
        assert results == [(2, "bar"), (8, "hello")]

    _delete_table_items(engine, test_table)

    # try with same parent ids
    nodes = [
        Node(
            text="user_id:2,foo:bar",
            relationships={DocumentRelationship.SOURCE: "test"},
        ),
        Node(
            text="user_id:8,foo:hello",
            relationships={DocumentRelationship.SOURCE: "test"},
        ),
    ]
    sql_database = SQLDatabase(engine, metadata=metadata_obj)
    index = GPTSQLStructStoreIndex(
        nodes,
        sql_database=sql_database,
        table_name=table_name,
        service_context=mock_service_context,
        **index_kwargs
    )
    assert isinstance(index, GPTSQLStructStoreIndex)

    # test that only one node (the last one) is inserted
    stmt = select(test_table.c["user_id", "foo"])
    engine = index.sql_database.engine
    with engine.connect() as connection:
        results = connection.execute(stmt).fetchall()
        print(results)
        assert results == [(8, "hello")]


def test_sql_index_with_context(
    mock_service_context: ServiceContext,
    struct_kwargs: Tuple[Dict, Dict],
) -> None:
    """Test GPTSQLStructStoreIndex."""
    # test setting table_context_dict
    engine = create_engine("sqlite:///:memory:")
    metadata_obj = MetaData()
    table_name = "test_table"
    test_table = Table(
        table_name,
        metadata_obj,
        Column("user_id", Integer, primary_key=True),
        Column("foo", String(16), nullable=False),
    )
    metadata_obj.create_all(engine)
    # NOTE: we can use the default output parser for this
    index_kwargs, _ = struct_kwargs
    docs = [Document(text="user_id:2,foo:bar"), Document(text="user_id:8,foo:hello")]
    sql_database = SQLDatabase(engine)
    table_context_dict = {"test_table": "test_table_context"}

    # test with ignore_db_schema=True
    sql_context_container = SQLContextContainerBuilder(
        sql_database, context_dict=table_context_dict
    ).build_context_container(ignore_db_schema=True)

    index = GPTSQLStructStoreIndex.from_documents(
        docs,
        sql_database=sql_database,
        table_name=table_name,
        sql_context_container=sql_context_container,
        service_context=mock_service_context,
        **index_kwargs
    )
    assert isinstance(index, GPTSQLStructStoreIndex)
    assert index.sql_context_container.context_dict == table_context_dict
    _delete_table_items(engine, test_table)

    # test with ignore_db_schema=False (default)
    sql_database = SQLDatabase(engine)
    sql_context_container = SQLContextContainerBuilder(
        sql_database, context_dict=table_context_dict
    ).build_context_container()

    index = GPTSQLStructStoreIndex.from_documents(
        docs,
        sql_database=sql_database,
        table_name=table_name,
        sql_context_container=sql_context_container,
        **index_kwargs
    )
    assert isinstance(index, GPTSQLStructStoreIndex)
    for k, v in table_context_dict.items():
        context_dict = index.sql_context_container.context_dict
        assert context_dict is not None
        assert len(context_dict[k]) > len(v)
        assert v in context_dict[k]
    _delete_table_items(engine, test_table)

    # test setting sql_context_builder
    sql_database = SQLDatabase(engine)
    # this should cause the mock QuestionAnswer prompt to run
    context_documents_dict: Dict[str, List[BaseDocument]] = {
        "test_table": [Document("test_table_context")]
    }
    sql_context_builder = SQLContextContainerBuilder.from_documents(
        context_documents_dict,
        sql_database=sql_database,
        table_context_prompt=MOCK_TABLE_CONTEXT_PROMPT,
        table_context_task="extract_test",
    )
    sql_context_container = sql_context_builder.build_context_container(
        ignore_db_schema=True
    )
    index = GPTSQLStructStoreIndex.from_documents(
        docs,
        sql_database=sql_database,
        table_name=table_name,
        sql_context_container=sql_context_container,
        **index_kwargs
    )
    assert isinstance(index, GPTSQLStructStoreIndex)
    assert index.sql_context_container.context_dict == {
        "test_table": "extract_test:test_table_context"
    }

    # test error if both are set
    # TODO:


def test_sql_index_with_derive_index(mock_service_context: ServiceContext) -> None:
    """Test derive index."""
    # test setting table_context_dict
    engine = create_engine("sqlite:///:memory:")
    metadata_obj = MetaData()
    table_name = "test_table"
    Table(
        table_name,
        metadata_obj,
        Column("user_id", Integer, primary_key=True),
        Column("foo", String(16), nullable=False),
    )
    metadata_obj.create_all(engine)
    # NOTE: we can use the default output parser for this
    sql_database = SQLDatabase(engine)
    table_context_dict = {"test_table": "test_table_context"}

    context_builder = SQLContextContainerBuilder(
        sql_database, context_dict=table_context_dict
    )
    context_index_no_ignore = context_builder.derive_index_from_context(
        GPTListIndex,
    )
    context_index_with_ignore = context_builder.derive_index_from_context(
        GPTListIndex, ignore_db_schema=True
    )
    assert len(context_index_with_ignore.index_struct.nodes) == 1
    assert len(context_index_no_ignore.index_struct.nodes) > 1


def test_sql_index_with_index_context(
    mock_service_context: ServiceContext,
    struct_kwargs: Tuple[Dict, Dict],
) -> None:
    """Test GPTSQLStructStoreIndex."""
    # test setting table_context_dict
    engine = create_engine("sqlite:///:memory:")
    metadata_obj = MetaData()
    table_name = "test_table"
    Table(
        table_name,
        metadata_obj,
        Column("user_id", Integer, primary_key=True),
        Column("foo", String(16), nullable=False),
    )
    metadata_obj.create_all(engine)
    # NOTE: we can use the default output parser for this
    index_kwargs, _ = struct_kwargs
    docs = [Document(text="user_id:2,foo:bar"), Document(text="user_id:8,foo:hello")]
    sql_database = SQLDatabase(engine)
    table_context_dict = {"test_table": "test_table_context"}

    context_builder = SQLContextContainerBuilder(
        sql_database, context_dict=table_context_dict
    )
    context_index = context_builder.derive_index_from_context(
        GPTListIndex, ignore_db_schema=True
    )
    # NOTE: the response only contains the first line (metadata), since
    # with the mock patch, newlines are treated as separate calls.
    context_response = context_builder.query_index_for_context(
        context_index,
        "Context query?",
        query_tmpl="{orig_query_str}",
        store_context_str=True,
    )
    sql_context_container = context_builder.build_context_container(
        ignore_db_schema=True
    )
    print(context_response)
    assert (
        context_response == "Context query?:table_name: test_table:test_table_context"
    )
    assert sql_context_container.context_str == context_response

    index = GPTSQLStructStoreIndex.from_documents(
        docs,
        sql_database=sql_database,
        table_name=table_name,
        sql_context_container=sql_context_container,
        service_context=mock_service_context,
        **index_kwargs
    )
    # just assert this runs
    sql_query_engine = GPTNLStructStoreQueryEngine(index)
    sql_query_engine.query(QueryBundle("test_table:foo"))
