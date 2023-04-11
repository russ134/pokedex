import React, { useState, useEffect} from 'react';
import { MDBBtn, MDBListGroup, MDBListGroupItem} from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import { RootState } from './pokedexreducers';
import { Pokemon, Ability, Move, Type} from './types/pokemontypes';
import styles from './Pokedex.module.css';
import axios from 'axios';

const SearchPokedexList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [pokemonMoves, setPokemonMoves] = useState<string[][]>([]);
  const [pokemonAbilities, setPokemonAbilities] = useState<string[][]>([]);
  const [pokemonTypes, setPokemonTypes] = useState<string[][]>([]);
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

  const fetchPokemonAbilities = async (id: number) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const abilities: any[] = response.data.abilities.map((ability: Ability) => ability.ability);
    const abilityArray: string[] = abilities
      .filter((ability) => ability && ability.name)
      .map((ability) => ability.name);
    if(abilityArray.length > 0){
      setPokemonAbilities((prevState) => [...prevState, abilityArray]);
    }
  };

  const fetchPokemonTypes = async (id: number) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const ptypes: any[] = response.data.types.map((type: Type) => type.type);
    const typeArray: string[] = ptypes
      .filter((type) => type && type.name)
      .map((type) => type.name);
    if(typeArray.length > 0){
      setPokemonTypes((prevState) => [...prevState, typeArray]);
    }
  };

  function retryQuery(q: string): void {
    const searchInput = document.getElementById("searchInput") as HTMLInputElement;
    searchInput.value = q;
    handleSearch(q);
  }

  function resetQuery(): void{
    const resetSearchInput = document.getElementById("searchInput") as HTMLInputElement;
    resetSearchInput.value = "";
    setSearchQuery(resetSearchInput.value);
  }

  useEffect(() => {
    setPokemonMoves([]);
    setPokemonTypes([]);
    setPokemonAbilities([]);
    if (selectedPokemon) {
      fetchPokemonMoves(selectedPokemon.id);
      fetchPokemonAbilities(selectedPokemon.id);
      fetchPokemonTypes(selectedPokemon.id);
    }
  }, [selectedPokemon]);

  const handleSearch = (searchTerm: string) => {
    setSearchQuery(searchTerm);
    setSearchHistory((prevState) => [...prevState, searchTerm]);
  };

  return (
    <div id="parentwrapper" className={styles.parentwrapper}>

  
<div className={styles.section}>
<h1>Search History</h1>
  <div id="searchhistory" className={styles.searchhistory}>
    {searchHistory.length > 0 && (
      <div>
        <p>Previous Keyword Searches:</p>
        <MDBListGroup className={styles.searchhistory}>
          {searchHistory.map((term, index) => (
            <MDBListGroupItem key={index} className={styles.historyItem}><MDBBtn className={styles.pokebtnHistory} onClick={() => retryQuery(term)}>Retry</MDBBtn> {term} </MDBListGroupItem>
          ))}
        </MDBListGroup>
      </div>
    )}
  </div>
</div>

<div className={styles.section}>
  <h1>Search</h1>
  <div id="queryresults" className={styles.queryresults}>
    <div id="searchbar" className={styles.searchbar}>
      <label htmlFor="searchInput">I choose: </label>
      <input
        type="text"
        id="searchInput"
        placeholder="Enter Pokemon name"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <MDBBtn className={styles.pokebtn} onClick={() => handleSearch(searchQuery)}>Search</MDBBtn>
      <MDBBtn className={styles.pokebtn} onClick={() => resetQuery()} color="success">Reset</MDBBtn>
    </div>
    <div id="searchresults" className={styles.row}>
      <div className={styles.resultwrapper}>
        {filteredPokemon.map((pokemon: Pokemon, index: number) => (
          <div
            id="pokeitem"
            key={pokemon.id}
            className={styles.resultitem}
            onClick={() => {setSelectedPokemon(pokemon);}}>
            <img src={pokemon.imageUrl} alt={pokemon.name} />
            <p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
<div className={styles.section}>
<h1>Details</h1>
    <div id="pokedetails" className={styles.pokedetails}>
      {selectedPokemon && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <MDBBtn className="mx-2" color="tertiary" rippleColor="light" onClick={() => setSelectedPokemon(null)}>Close X</MDBBtn>
        <div id="typel">
            <h4 className='bg-light p-2 border-top border-bottom'>{selectedPokemon && selectedPokemon.name && selectedPokemon.name.charAt(0).toUpperCase()+selectedPokemon.name.slice(1)} - Pokemon Type:</h4>
          <div id="typelist">
            <MDBListGroup className={styles.typelist}>
            {pokemonTypes.map((types: string[], index: number) => (
                  types.length > 0 && (
                  <MDBListGroupItem key={index}>
                    {types.filter(Boolean).map((typeName: string, i: number) => (
                        <MDBListGroupItem key={i}>{typeName.charAt(0).toUpperCase()+typeName.slice(1)}</MDBListGroupItem>
                    ))}
                  </MDBListGroupItem>
                  )
              ))}
            </MDBListGroup>
          </div>
        </div> 
          <div id="abilityl">
            <h4 className='bg-light p-2 border-top border-bottom groupheader'>{selectedPokemon && selectedPokemon.name && selectedPokemon.name.charAt(0).toUpperCase()+selectedPokemon.name.slice(1)} Abilities:</h4>
          <div id="abilitylist">
            <MDBListGroup className={styles.abilitylist}>
            {pokemonAbilities.map((abilities: string[], index: number) => (
                  abilities.length > 0 && (
                  <MDBListGroupItem key={index}>
                    {abilities.filter(Boolean).map((abilityName: string, i: number) => (
                        <MDBListGroupItem key={i}>{abilityName.charAt(0).toUpperCase()+abilityName.slice(1)}</MDBListGroupItem>
                    ))}
                  </MDBListGroupItem>
                  )
              ))}
            </MDBListGroup>
          </div>
        </div>        
        <div id="movel">
            <h4 className='bg-light p-2 border-top border-bottom'>{selectedPokemon && selectedPokemon.name && selectedPokemon.name.charAt(0).toUpperCase()+selectedPokemon.name.slice(1)} Moves:</h4>
          <div id="movelist">
            <MDBListGroup className={styles.movelist}>
            {pokemonMoves.map((moves: string[], index: number) => (
                  moves.length > 0 && (
                  <MDBListGroupItem key={index}>
                    {moves.filter(Boolean).map((moveName: string, i: number) => (
                        <MDBListGroupItem key={i}>{moveName.charAt(0).toUpperCase()+moveName.slice(1)}</MDBListGroupItem>
                    ))}
                  </MDBListGroupItem>
                  )
              ))}
            </MDBListGroup>
          </div>
        </div>
          </div>
        </div>
      )}
    </div>
</div>
    </div>
  );
};

export default SearchPokedexList;
