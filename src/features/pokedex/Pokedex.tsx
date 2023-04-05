import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store'
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { fetchPokemon } from './pokedexactions';
import { AppState, Pokemon } from '../../pokemontypes';
//import { SafeAreaView, TextInput } from 'react-native';
//import styles from './Pokedex.module.css';


const Pokedex: React.FC = () => {

    const dispatch: ThunkDispatch<AppState, null, AnyAction> = useDispatch();
    const { pokemonList, loading, error } = useSelector((state: RootState) => state.pokemon);
  
    console.log(pokemonList);
    
    /*useEffect(() => {
      dispatch(fetchPokemon());
    }, [dispatch]);*/
  
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