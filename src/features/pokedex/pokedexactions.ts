import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { RootState } from '../pokedex/pokedexreducers';
import { Pokemon } from './types/pokemontypes';

// Action types
export enum PokemonActionTypes {
  FETCH_POKEMON_REQUEST = 'FETCH_POKEMON_REQUEST',
  FETCH_POKEMON_SUCCESS = 'FETCH_POKEMON_SUCCESS',
  FETCH_POKEMON_FAILURE = 'FETCH_POKEMON_FAILURE',
}

// Action interfaces
export interface FetchPokemonRequestAction {
  type: PokemonActionTypes.FETCH_POKEMON_REQUEST;
}

export interface FetchPokemonSuccessAction {
  type: PokemonActionTypes.FETCH_POKEMON_SUCCESS;
  payload: Pokemon[];
}

export interface FetchPokemonFailureAction {
  type: PokemonActionTypes.FETCH_POKEMON_FAILURE;
  payload: string;
}

// Union type of all actions
export type PokemonActions =
  | FetchPokemonRequestAction
  | FetchPokemonSuccessAction
  | FetchPokemonFailureAction;

  export const fetchPokemonRequest = (): FetchPokemonRequestAction => ({
    type: PokemonActionTypes.FETCH_POKEMON_REQUEST,
  });
  
  export const fetchPokemonSuccess = (pokemonList: Pokemon[]): FetchPokemonSuccessAction => ({
    type: PokemonActionTypes.FETCH_POKEMON_SUCCESS,
    payload: pokemonList,
  });
  
  export const fetchPokemonFailure = (error: string): FetchPokemonFailureAction => ({
    type: PokemonActionTypes.FETCH_POKEMON_FAILURE,
    payload: error,
  });

// Thunk action creator to fetch Pokemon data
export const fetchPokemon = (): ThunkAction<
  void,
  RootState,
  null,
  PokemonActions> => async (dispatch: Dispatch<PokemonActions>, getState: () => RootState) => {
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
      console.log(pokemonList);//TODO: Remove when finished
      //console.log(response.data.results);
    })
    .catch((error) => {
      dispatch(fetchPokemonFailure(error.message));
    });
};

