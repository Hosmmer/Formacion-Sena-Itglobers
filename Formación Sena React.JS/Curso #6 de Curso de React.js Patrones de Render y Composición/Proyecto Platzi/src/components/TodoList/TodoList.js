import './TodoList.css';

function TodoList({ error, loading, searchedTodos, onError, onLoading, onEmptyTodos, totalTodos, onEmptySearchResults, searchText, render, children }) {
  const renderFunc = children || render

  return (

    <section className="TodoList-container">

      {error && onError()}
      {loading && onLoading()}

      {/* Mostrar "Crea tu primer TODO!" solo si no hay TODOs y no hay búsqueda */}
      {!loading && totalTodos === 0 && !searchText && onEmptyTodos()}
      {!loading && totalTodos > 0 && searchedTodos.length === 0 && onEmptySearchResults(searchText)}
      {searchedTodos.map(renderFunc)}
      {/* <ul className="TodoList">
        {children}
      </ul> */}
    </section>
  );
}

export { TodoList };
