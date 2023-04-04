import { ThunkAction } from 'redux-thunk';
import { Dispatch, AnyAction } from 'redux';
import axios from 'axios';
import { AppState, Pokemon } from '../../pokemontypes';

export const FETCH_POKEMON_REQUEST = 'FETCH_POKEMON_REQUEST';
export const FETCH_POKEMON_SUCCESS = 'FETCH_POKEMON_SUCCESS';
export const FETCH_POKEMON_FAILURE = 'FETCH_POKEMON_FAILURE';

export const fetchPokemonRequest = () => ({
  type: FETCH_POKEMON_REQUEST,
});

export const fetchPokemonSuccess = (pokemonList: Pokemon[]) => ({
  type: FETCH_POKEMON_SUCCESS,
  payload: pokemonList,
});

export const fetchPokemonFailure = (error: string) => ({
  type: FETCH_POKEMON_FAILURE,
  payload: error,
});

//Main loading of Pokemon
export const fetchPokemon = (): ThunkAction<void, AppState, null, AnyAction> => {
  return (dispatch: Dispatch, getState: () => AppState) => {
    dispatch(fetchPokemonRequest());
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then((response) => {
        const pokemonList = response.data.results.map((pokemon: any, index: number) => {
          return {
            id: index + 1,
            name: pokemon.name,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
          };
        });
        dispatch(fetchPokemonSuccess(pokemonList));
        //console.log(pokemonList);//TODO: Remove when finished
        //console.log(response.data.results);
      })
      .catch((error) => {
        dispatch(fetchPokemonFailure(error.message));
      });
  };
};
