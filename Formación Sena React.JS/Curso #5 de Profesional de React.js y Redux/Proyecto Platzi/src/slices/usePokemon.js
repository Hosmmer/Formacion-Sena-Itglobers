import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonsWithDetails } from '../slices/dataSlice';

const usePokemons = () => {
    const dispatch = useDispatch();

    // Obtener el estado de los pokemones filtrados y de la carga
    const pokemons = useSelector((state) => state.data.filteredPokemons);
    const loading = useSelector((state) => state.ui.loading);

    // Efecto que se ejecuta al montar el componente
    useEffect(() => {
        dispatch(fetchPokemonsWithDetails());
    }, [dispatch]);

    return { pokemons, loading };
};

export default usePokemons;
