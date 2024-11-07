import React from "react";
import { Route, Link, BrowserRouter, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import ExibirDesafiosFalso from "../Aplicacao/CriadorDesafio/ExibirDesafiosFalso";
import DetalhesDesafio from "../Pages/DesafioDetalhado/DesafioDetalhado";
import AdicionarDesafio from "../Aplicacao/CriadorDesafio/AdicionarDesafio";
import GoogleAuth from "../Pages/Login/GoogleAuth";

function Rotas() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/home"> PG Home</Link> <br />
        <Link to="/desafiosDetalhados"> PG Desafios Detalhados</Link> <br />
        <Link to="/exibirDesafios"> PG Exibir Desafios</Link> <br />
        <Link to="/criarDesafio"> PG Criar Desafio</Link> <br />
        <Link to="/googleAuth"> PG Google Auth</Link> <br />
      </nav>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/desafiosDetalhados" element={<DetalhesDesafio />} />
        <Route path="/exibirDesafios" element={<ExibirDesafiosFalso />} />
        <Route path="/criarDesafio" element={<AdicionarDesafio />} />
        <Route path="/googleAuth" element={<GoogleAuth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
