import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './pokedexreducers';
import { Pokemon } from './types/pokemontypes';
import styles from './Pokedex.module.css';
import axios from 'axios';

const SearchPokemonList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemonMoves, setPokemonMoves] = useState<any[]>([]);
  const pokemonList = useSelector((state: RootState) => state.pokemon.pokemonList);

  const [showPopup, setShowPopup] = useState(false);

  function handleDivClick() {
    setShowPopup(true);
  }

  function handleCloseClick() {
    setShowPopup(false);
  }

  const filteredPokemon = pokemonList.filter((pokemon: Pokemon) =>
    pokemon.name.includes(searchQuery.toLowerCase())
  );

  const fetchPokemonMoves = async (id: number) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const moves = response.data.moves;
    setPokemonMoves((prevMoves) => [...prevMoves, moves]);
  };

  useEffect(() => {
    setPokemonMoves([]);
    filteredPokemon.forEach((pokemon: Pokemon) => {
      fetchPokemonMoves(pokemon.id);
    });
  }, [filteredPokemon]);

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
          {filteredPokemon.map((pokemon: Pokemon, index: number) => (
            <div id="pokeitem" key={pokemon.id} className={styles.resultitem} onClick={handleDivClick}>
              <img src={pokemon.imageUrl} alt={pokemon.name} />
              <p>{pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1)}</p>
              {showPopup && (
                <div>
                  <h3>{pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1)} Moves:</h3>
                  <ul>
                    {pokemonMoves[index]?.map((move: any, i: number) => (
                      <li key={i}>{move.move.name.charAt(0).toUpperCase()+move.move.name.slice(1)}</li>
                    ))}
                  </ul>
                  <button onClick={handleCloseClick}>Close</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPokemonList;
