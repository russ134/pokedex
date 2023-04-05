//import React from 'react';
import { useDispatch } from 'react-redux';
//import { fetchPokemon } from './pokedexactions';

const PokemonButton = () => {
  const dispatch = useDispatch();

  const handleFetchPokemonClick = () => {
   // dispatch(fetchPokemon());
  };

  return (
    <div>
      <button onClick={handleFetchPokemonClick}>Fetch Pokemon</button>
      {/* rest of component code */}
    </div>
  );
};

export default PokemonButton;