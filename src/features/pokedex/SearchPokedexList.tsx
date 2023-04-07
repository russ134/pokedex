import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './pokedexreducers';
import { Pokemon, Move } from './types/pokemontypes';
import styles from './Pokedex.module.css';
import axios from 'axios';

const SearchPokedexList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [pokemonMoves, setPokemonMoves] = useState<string[][]>([]);
  const pokemonList = useSelector((state: RootState) => state.pokemon.pokemonList);

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const filteredPokemon = pokemonList.filter((pokemon: Pokemon) =>
    pokemon?.name?.includes(searchQuery.toLowerCase())
  );

  const fetchPokemonMoves = async (id: number) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const moves: any[] = response.data.moves.map((move: Move) => move.move);
    const movesArray: string[] = moves
      .filter((move) => move && move.name)
      .map((move) => move.name);
    if (movesArray.length > 0) {
      setPokemonMoves((prevState) => [...prevState, movesArray]);
    }
  };

  useEffect(() => {
    setPokemonMoves([]);
    if (selectedPokemon) {
      fetchPokemonMoves(selectedPokemon.id);
    }
  }, [selectedPokemon]);

  const handleSearch = (searchTerm: string) => {
    setSearchQuery(searchTerm);
    setSearchHistory((prevState) => [...prevState, searchTerm]);
  };

  return (
    <div>
      <div>
        <label htmlFor="searchInput">I choose: </label>
        <input
          type="text"
          id="searchInput"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button onClick={() => handleSearch(searchQuery)}>Search</button>
      </div>
      {searchHistory.length > 0 && (
        <div>
          <p>Search History:</p>
          <ul>
            {searchHistory.map((term, index) => (
              <li key={index}>{term}</li>
            ))}
          </ul>
        </div>
      )}
      <div id="searchresults" className={styles.row}>
        <div className={styles.resultwrapper}>
          {filteredPokemon.map((pokemon: Pokemon, index: number) => (
            <div
              id="pokeitem"
              key={pokemon.id}
              className={styles.resultitem}
              onClick={() => setSelectedPokemon(pokemon)}
            >
              <img src={pokemon.imageUrl} alt={pokemon.name} />
              <p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
            </div>
          ))}
        </div>
        {selectedPokemon && (
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              <button className={styles.closeButton} onClick={() => setSelectedPokemon(null)}>X</button>
          <div>
              <h4>{selectedPokemon && selectedPokemon.name && selectedPokemon.name.charAt(0).toUpperCase()+selectedPokemon.name.slice(1)} Moves:</h4>
            <div id="movelist">
              <ul className={styles.movelist}>
              {pokemonMoves.map((moves: string[], index: number) => (
                    moves.length > 0 && (
                    <li key={index}>
                      {moves.filter(Boolean).map((moveName: string, i: number) => (
                          <li key={i}>{moveName.charAt(0).toUpperCase()+moveName.slice(1)}</li>
                      ))}
                    </li>
                    )
                ))}
              </ul>
            </div>
          </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPokedexList;
