import logo from './images/logo_pokedex.png';
import pokeball from './images/pokeball.png';
import SearchPokedexList from './features/pokedex/SearchPokedexList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={pokeball} className="App-logo-pokeball" alt="pokeball"/>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
        <div>
        </div>
      </header>
      <SearchPokedexList />
    </div>
  );
}

export default App;
