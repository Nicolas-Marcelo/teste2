import React, { useState } from 'react';
import { auth } from '../../Firebase/FirebaseConfig';
import Input from '../../Components/Input';
import axios from 'axios';

function AdicionarDesafio() {
  const [desafio, setDesafio] = useState('');
  const [recompensa, setRecompensa] = useState('');
  const [dataLimite, setDataLimite] = useState('');
  const [descricao, setDescricao] = useState('');
  const [comunicacao, setComunicacao] = useState('');
  const [criterios, setCriterios] = useState('');
  const [listaCriterios, setListaCriterios] = useState([]);

  const adicionarCriterio = () => {
    if (criterios.trim() !== '') {
      setListaCriterios([...listaCriterios, criterios]);
      setCriterios('');
    }
  };

  const adicionar = async () => {
    try {
      const usuario = auth.currentUser;

      const desafioData = {
        desafio,
        recompensa,
        dataLimite,
        descricao,
        comunicacao,
        criterios: listaCriterios,
        autorId: usuario.uid,
      }

      const resposta = await axios.post('http://localhost:8080/desafios', desafioData)

      if (resposta.status === 200) {
        console.log('Desafio Adicinoadoooo')

        setDesafio('');
        setRecompensa('');
        setDataLimite('');
        setDescricao('');
        setComunicacao('');
        setListaCriterios([]);
      } else {
        alert('Rezando para não aparecer!')
      }

      console.log('Dale pontênciaaaaaaaa');
    } catch (error) {
      console.log('Mais um e eu pulo da ponte, adicionar desafio', error);
    }
  };

  return (
    <div>
      <strong>ESTÁ PAGINA DEVE DEIXAR O USUARIO ADICIONAR UM DESAFIO</strong>
      <Input
        type="text"
        value={desafio}
        onChange={(e) => setDesafio(e.target.value)}
        placeholder="Título do Desafio"
      />
      <Input
        type="text"
        value={recompensa}
        onChange={(e) => setRecompensa(e.target.value)}
        placeholder="Valor da recompensa"
      />
      <Input
        type="date"
        value={dataLimite}
        onChange={(e) => setDataLimite(e.target.value)}
        placeholder="Data limite do desafio"
      />
      <Input
        type="text"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        placeholder="Descrição do Desafio"
      />
      <Input
        type="text"
        value={comunicacao}
        onChange={(e) => setComunicacao(e.target.value)}
        placeholder="Contato (telefone ou email)"
      />
      <Input
        type="text"
        value={criterios}
        onChange={(e) => setCriterios(e.target.value)}
        placeholder="Critérios para o desafio"
      />
      <button onClick={adicionarCriterio}>Adicionar Critério</button>

      <ul>
        {listaCriterios.map((criterio, index) => (
          <li key={index}>{criterio}</li>
        ))}
      </ul>

      <button onClick={adicionar}>Salvar Desafio</button>
    </div>
  );
}

export default AdicionarDesafio;
