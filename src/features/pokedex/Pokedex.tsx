import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { fetchPokemon } from './pokedexAPI';
import { AppState, Pokemon } from '../../pokemontypes';
//import { SafeAreaView, TextInput } from 'react-native';
//import styles from './Pokedex.module.css';


const Pokedex = () => {

    const dispatch: ThunkDispatch<AppState, null, AnyAction> = useDispatch();
    const pokemonList = useSelector((state: AppState) => state.pokemonList);
    const loading = useSelector((state: AppState) => state.loading);
    const error = useSelector((state: AppState) => state.error);
  
    console.log(pokemonList);
    
    useEffect(() => {
      dispatch(fetchPokemon());
    }, [dispatch]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
    
    //Check if ArrayList of Pokemon return
    if (!pokemonList) {
      return <div>No Pokemon found due to being undefined.</div>;
    }
  
    return (
      <div>
        {pokemonList.map((pokemon: Pokemon) => (
          <div key={pokemon.id}>
            <img src={pokemon.imageUrl} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default Pokedex;