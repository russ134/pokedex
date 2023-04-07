import React, { useState} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './pokedexreducers';
import { Pokemon } from './types/pokemontypes';
//import { getPokemonMoves } from './api/getPokemonMoves';
import styles from './Pokedex.module.css';
//import axios from 'axios';



const SearchPokemonList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    //const [moves, setPokemonMoves] = useState(null);
    const pokemonList = useSelector((state: RootState) => state.pokemon.pokemonList);
    //console.log(pokemonList[0]);
    const filteredPokemon = pokemonList.filter((pokemon: Pokemon) =>
      pokemon.name.includes(searchQuery.toLowerCase())
    );

   
     /*const fetchPokemonMoves = async (id: number) => {
        const response = await axios.get('https://pokeapi.co/api/v2/move/${id}');
        console.log(response.data);
        //setPokemonMoves(response.data);
     };

     useEffect(() => {
        fetchPokemonMoves(1);
    }, []);*/



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
              <div id="pokeitem" key={pokemon.id} className={styles.resultitem}>
                <img src={pokemon.imageUrl} alt={pokemon.name} />
                <p>{pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1)}</p>
                <div className={styles.container}>
                  <div className={styles.hoverable}>More</div>
                  {/*<div className={styles.detailspopup}>value={pokemon.id}</div>*/}
                  <div className={styles.detailspopup}>I'm a popup</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  };
  
   

export default SearchPokemonList;