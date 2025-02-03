import './TodoSearch.css';


function TodoSearch({ searchValue, setSearchValue, loading }) {

  return (
    <div className="TodoSearchContainer">
      {loading ? (
        <div className="Skeleton Skeleton-search"></div>
      ) : (
        <input
          placeholder="Busca La Tarea"
          className="TodoSearch"
          value={searchValue}
          onChange={(Event) => {
            setSearchValue(Event.target.value);
          }}
        />
      )}
    </div>
  );
}

export { TodoSearch };
