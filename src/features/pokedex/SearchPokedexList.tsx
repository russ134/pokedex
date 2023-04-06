import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './pokedexreducers';
import { Pokemon } from './types/pokemontypes';
import styles from './Pokedex.module.css';


const SearchPokemonList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const pokemonList = useSelector((state: RootState) => state.pokemon.pokemonList);

    const filteredPokemon = pokemonList.filter((pokemon: Pokemon) =>
      pokemon.name.includes(searchQuery.toLowerCase())
    );
 

    return (
      <div>
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <div id="searchresults" className={styles.row}>
          <div className={styles.resultwrapper}>
            {filteredPokemon.map((pokemon: Pokemon) => (
              <div key={pokemon.id} className={styles.resultitem}>
                <img src={pokemon.imageUrl} alt={pokemon.name} />
                <p>{pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  };
  
   

export default SearchPokemonList;