import React from 'react';
import logo from './images/logo_pokedex.png';
//import Pokedex from './features/pokedex/Pokedex';
import SearchPokedexList from './features/pokedex/SearchPokedexList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <SearchPokedexList />
          {/*<Pokedex />*/}
        </div>
      </header>
    </div>
  );
}

export default App;
