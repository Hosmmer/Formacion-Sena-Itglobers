import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPokemon, getPokemonDetails } from '../api';
import { setLoading } from './uiSlice';

const initialState = {
  pokemons: [],
  filteredPokemons: [],
};

export const fetchPokemonsWithDetails = createAsyncThunk(
  'data/fetchPokemonsWithDetails',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    const pokemonsRes = await getPokemon();
    const pokemonsDetailed = await Promise.all(
      pokemonsRes.map((pokemon) => getPokemonDetails(pokemon))
    );
    dispatch(setPokemons(pokemonsDetailed));
    dispatch(setLoading(false));
  }
);

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
      state.filteredPokemons = action.payload; // Inicializa con todos los Pokémon
    },
    filterPokemons: (state, action) => {
      const query = action.payload.toLowerCase();
      state.filteredPokemons = state.pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query)
      );
    },
    setFavorite: (state, action) => {
      // Actualizar el estado de `pokemons`
      const currentPokemonIndex = state.pokemons.findIndex(
        (pokemon) => pokemon.id === action.payload.pokemonId
      );

      if (currentPokemonIndex >= 0) {
        const isFavorite = state.pokemons[currentPokemonIndex].favorite;
        state.pokemons[currentPokemonIndex].favorite = !isFavorite;
      }

      // Actualizar el estado de `filteredPokemons`
      const filteredIndex = state.filteredPokemons.findIndex(
        (pokemon) => pokemon.id === action.payload.pokemonId
      );

      if (filteredIndex >= 0) {
        const isFavorite = state.filteredPokemons[filteredIndex].favorite;
        state.filteredPokemons[filteredIndex].favorite = !isFavorite;
      }
    },
  },
});

export const { setFavorite, setPokemons, filterPokemons } = dataSlice.actions;

export default dataSlice.reducer;
