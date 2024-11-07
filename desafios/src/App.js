import React from 'react';
import Rotas from './Router/Rotas.js';
import Home from './Pages/Home/Home.js';
import AdicionarDesafio from './Aplicacao/CriadorDesafio/AdicionarDesafio.js';
import Desafios from './Pages/Home/Home.js';

function App() {

  return (
    <div>
      <Home />
      <AdicionarDesafio />
    </div>
  );
}

export default App;
