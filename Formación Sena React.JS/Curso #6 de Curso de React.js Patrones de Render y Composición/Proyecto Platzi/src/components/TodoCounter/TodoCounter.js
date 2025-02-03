import './TodoCounter.css';

function TodoCounter({ loading, completedTodos, totalTodos }) {
  // const { totalTodos, completedTodos, loading } = useContext(TodoContext);

  return (
    <div className="TodoCounterContainer">
      {loading ? (
        <div className="TodoCounterSkeleton"></div>
      ) : (
        <h1 className="TodoCounter">
          Has completado <span>{completedTodos}</span> de <span>{totalTodos}</span> TODOs
        </h1>
      )}
    </div>
  );
}

export { TodoCounter };
