//Reducer
import {
    FETCH_POKEMON_REQUEST,
    FETCH_POKEMON_SUCCESS,
    FETCH_POKEMON_FAILURE,
  } from '../pokedex/pokedexAPI';//Actions
import { AppState } from '../../pokemontypes';
  
  const initialState: AppState = {
    pokemonList: [],
    loading: false,
    error: null,
  };
  
  const reducer = (state = initialState, action: any) => {
    console.log(action.type);
    switch (action.type) {
      case FETCH_POKEMON_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_POKEMON_SUCCESS:
        return {
          ...state,
          loading: false,
          pokemonList: action.payload,
        };
      case FETCH_POKEMON_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

console.log(initialState);

console.log("this is the reducer " + reducer);

export default reducer;
  