import { SET_POKEMONS } from "./types";
import { getPokemonDetails } from "../api";

export const setPokemons = (payload) => ({
    type: SET_POKEMONS,
    payload,
});


export const getPokemonWithDetails =
    (pokemonns = []) =>
        async (dispatch) => {

            const pokemonDetailed = await Promise.all(
                pokemonns.map((pokemon) => getPokemonDetails(pokemon))
            );
            dispatch(setPokemons(pokemonDetailed));
        };