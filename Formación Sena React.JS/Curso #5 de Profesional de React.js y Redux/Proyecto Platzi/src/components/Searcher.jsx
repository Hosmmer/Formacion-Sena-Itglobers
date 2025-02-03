import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { filterPokemons } from '../slices/dataSlice';

const Searcher = () => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(filterPokemons(e.target.value));
  };

  return (
    <Input.Search
      placeholder="Buscar..."
      onChange={handleSearch}
      style={{ marginBottom: 10 }}
    />
  );
};

export default Searcher;
