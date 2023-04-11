//Reducer
import { combineReducers } from 'redux';
import { PokemonActionTypes } from './api/pokedexactions';
import { AppState } from './types/pokemontypes';
  
  const initialState: AppState = {
    pokemonList: [],
    loading: false,
    error: null,
  };
  
 export const pokemonReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case PokemonActionTypes.FETCH_POKEMON_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case PokemonActionTypes.FETCH_POKEMON_SUCCESS:
        return {
          ...state,
          loading: false,
          pokemonList: action.payload,
        };
      case PokemonActionTypes.FETCH_POKEMON_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

export const rootReducer = combineReducers({
  pokemon: pokemonReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
  