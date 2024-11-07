import React, { useEffect, useState } from 'react';
import Solucoes from './AdicionarSolucao';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DetalhesDesafios() {
  const { desafioId } = useParams(); 
  const [desafio, setDesafio] = useState(null);

  useEffect(() => {
    const fetchDesafio = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/desafios/${desafioId}`);
        setDesafio(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do desafio:', error);
      }
    };

    fetchDesafio();
  }, [desafioId]);

  if (!desafio) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Detalhes do Desafio</h1>
      <p><strong>Nome:</strong> {desafio.desafio}</p>
      <p><strong>Descrição:</strong> {desafio.descricao}</p>
      <p><strong>Recompensa:</strong> {desafio.recompensa}</p>
      <p><strong>Local:</strong> {desafio.local}</p> {/* Exibe o campo local */}
      <p><strong>Critérios:</strong> {desafio.criterios?.join(', ')}</p>

      <Solucoes desafioId={desafioId} />
    </div>
  );
}

export default DetalhesDesafios;

/*
import React, { useEffect, useState } from 'react';
import Solucoes from './AdicionarSolucao';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DetalhesDesafios() {
  const { desafioId } = useParams(); 
  const [desafio, setDesafio] = useState('');

  useEffect(() => {
    const fetchDesafio = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/desafios/${desafioId}`);
        setDesafio(response.data);
      } catch (error) {
        console.error('Me mata de uma vezzzzzzzzzzzzz', error);
      }
    };

    fetchDesafio();
  }, [desafioId]);

  return (
    <div>
      <h1>teste 5864</h1>
      <p>Nome Desafio: {desafio.desafio}</p>
      <p>{desafio.descricao}</p>
      <p>Recompensa: {desafio.recompensa}</p>
      <p>Criterios: {desafio.criterios?.join(', ')}</p>

      <Solucoes desafioId={desafioId} />
    </div>
  );
}

export default DetalhesDesafios;
*/