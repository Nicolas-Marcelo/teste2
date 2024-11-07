import React, { useState, useEffect } from 'react';
import { db, auth } from '../../Firebase/FirebaseConfig';
import { collection, onSnapshot, getDoc, doc } from 'firebase/firestore';
import axios from 'axios';
import Solucoes from '../DesafioDetalhado/AdicionarSolucao';
import DetalhesDesafios from '../DesafioDetalhado/DesafioDetalhado';

// HOME SERÁ A PAGINA QUE MOSTRARA PARA O USUARIO TODOS OS DESAFIOS QUE FORAM POSTADOS
// ++ MONTAR A LOGICA DE MOSTRAR OS DESAFIOS MAIS RECENTES 
// ++ MONTAR A LOGICA DE VER QUAIS DESAFIOS AINDA ESTÃO DISPONIVEIS PARA SEREM SOLUCIONADOS

function Home() {
  const [desafios, setDesafios] = useState([]);
  const [desafioSelecionado, setDesafioSelecionado] = useState(null);
  
  useEffect(() => {
    const fetchDesafios = async () => {
      try {
        const response = await axios.get('http://localhost:8080/desafios');
        setDesafios(response.data);
      } catch (error) {
        console.error('Erro ao buscar desafios:', error);
      }
    };

    fetchDesafios();
  }, []);

  const IdDoDetalhe = (id) => {
    setDesafioSelecionado(id);
  };

  return (
    <div>
    <h1>Lista de Desafios</h1>
    <ul>
      {desafios.map((desafio) => (
        <li key={desafio.id}>
          <h3>{desafio.desafio}</h3>
          <button onClick={() => IdDoDetalhe(desafio.id)}>Ver Detalhes</button>
        </li>
      ))}
    </ul>

    {desafioSelecionado && (
      <DetalhesDesafios dinamicoId={desafioSelecionado} />
    )}
  </div>
);
}

export default Home;


/*import React, { useState, useEffect } from 'react';

function Desafios() {
  const [desafios, setDesafios] = useState([]); // Lista de desafios
  const [desafioSelecionado, setDesafioSelecionado] = useState(null); // Detalhes do desafio selecionado
  const [erro, setErro] = useState(null);

  // Carrega a lista de desafios na primeira renderização
  useEffect(() => {
    async function carregarDesafios() {
      try {
        const response = await fetch('/api/desafios'); // Endpoint que lista todos os desafios
        const data = await response.json();
        setDesafios(data); // Armazena a lista de desafios
      } catch (error) {
        setErro('Erro ao carregar desafios');
        console.error('Erro:', error);
      }
    }
    carregarDesafios();
  }, []);

  // Função para buscar o desafio pelo ID
  async function buscarDesafio(id) {
    try {
      const response = await fetch(`/api/desafios/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar desafio');
      }
      const data = await response.json();
      setDesafioSelecionado(data); // Armazena os detalhes do desafio selecionado
    } catch (error) {
      setErro('Erro ao buscar detalhes do desafio');
      console.error('Erro:', error);
    }
  }

  return (
    <div>
      <h1>Lista de Desafios</h1>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <ul>
        {desafios.map((desafio) => (
          <li key={desafio.id}>
            {desafio.desafio} - {desafio.descricao}
            <button onClick={() => buscarDesafio(desafio.id)}>
              Ver Detalhes
            </button>
          </li>
        ))}
      </ul>

      {desafioSelecionado && (
        <div>
          <h2>Detalhes do Desafio</h2>
          <p><strong>ID:</strong> {desafioSelecionado.id}</p>
          <p><strong>Desafio:</strong> {desafioSelecionado.desafio}</p>
          <p><strong>Descrição:</strong> {desafioSelecionado.descricao}</p>
          <p><strong>Critérios:</strong> {desafioSelecionado.criterios}</p>
          <p><strong>Autor ID:</strong> {desafioSelecionado.autorId}</p>
          <p><strong>Recompensa:</strong> {desafioSelecionado.recompensa}</p>
        </div>
      )}
    </div>
  );
}

export default Desafios;

*/