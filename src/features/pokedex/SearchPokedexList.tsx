import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './pokedexreducers';
import { Pokemon, Move} from './types/pokemontypes';
import styles from './Pokedex.module.css';
import axios from 'axios';

const SearchPokemonList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemonMoves, setPokemonMoves] = useState<string[][]>([]);
  const pokemonList = useSelector((state: RootState) => state.pokemon.pokemonList);

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const filteredPokemon = pokemonList.filter((pokemon: Pokemon) =>
    pokemon?.name?.includes(searchQuery.toLowerCase())
  );

  const fetchPokemonMoves = async (id: number) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log(response.data.moves);
    const moves: any[] = response.data.moves.map((move: any) => move.move);
    const movesArray: string[] = moves
      .filter((move) => move && move.move && move.move?.name)
      .map((move) => move.move?.name);
    if(movesArray){
    setPokemonMoves((prevState) => [...prevState, movesArray]);
    console.log(setPokemonMoves((prevState) => [...prevState, movesArray]));
    }
  };
  
  useEffect(() => {
    setPokemonMoves([]);
    if (selectedPokemon) {
      fetchPokemonMoves(selectedPokemon.id);
    }
  }, [selectedPokemon]);

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
            <div id="pokeitem" key={pokemon.id} className={styles.resultitem} onClick={() => setSelectedPokemon(pokemon)}>
              <img src={pokemon.imageUrl} alt={pokemon.name} />
              <p>{pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1)}</p>
            </div>
          ))}
        </div>
        {selectedPokemon && (
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              <button className={styles.closeButton} onClick={() => setSelectedPokemon(null)}>X</button>
              <h3>{selectedPokemon && selectedPokemon.name && selectedPokemon.name.charAt(0).toUpperCase()+selectedPokemon.name.slice(1)} Moves:</h3>
              <ul>
              {pokemonMoves.map((moves: string[], index: number) => (
                    moves.length > 0 && (
                        <li key={index}>
                            <h4>{selectedPokemon?.name.charAt(0).toUpperCase()+selectedPokemon?.name?.slice(1)}</h4>
                            <ul>
                                {moves.filter(Boolean).map((moveName: string, i: number) => (
                                    <li key={i}>{moveName}</li>
                                ))}
                            </ul>
                        </li>
                    )
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPokemonList;
