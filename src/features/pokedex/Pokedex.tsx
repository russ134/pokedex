import { useSelector } from 'react-redux';
import { RootState } from '../../app/store'
import { Pokemon } from './types/pokemontypes';
//import { SafeAreaView, TextInput } from 'react-native';
import styles from './Pokedex.module.css';


const Pokedex: React.FC = () => {
  
    const { pokemonList, loading, error } = useSelector((state: RootState) => state.pokemon);
  
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
      <div className={styles.row}>
          <div id='resultarea' className={styles.row}>
              <div className={styles.resultwrapper}>
              {pokemonList.map((pokemon: Pokemon) => (
                  <div  key={pokemon.id} className={styles.resultitem}>
                    <img src={pokemon.imageUrl} alt={pokemon.name} />
                    <p>{pokemon.name}</p>
                  </div>
                  ))}
              </div>
          </div>
      </div>
    );


  };
  
  export default Pokedex;