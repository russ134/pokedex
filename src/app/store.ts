import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import pokedexReducer from '../features/pokedex/pokedexreducers';

export const store = configureStore({
  reducer:{
    pokedex: pokedexReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
