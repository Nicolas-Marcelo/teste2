import React, { useState } from 'react';
import { auth, db } from '../../Firebase/FirebaseConfig';
import { collection, addDoc, updateDoc, doc, arrayUnion } from "firebase/firestore";

function Solucoes({ desafioId }) {
  const [solucao, setSolucao] = useState('');
  const usuario = auth.currentUser;

  const adicionarSolucao = async (e) => {
    e.preventDefault();

    try {
      const adicionar = await addDoc(collection(db, 'solucoes'), {
        user: usuario?.uid,
        solucao,
        desafioId,
        data: new Date().toISOString(),
      });

      const desafioRef = doc(db, 'desafios', desafioId);
      await updateDoc(desafioRef, {
        solucoes: arrayUnion(adicionar.id),
      });

      setSolucao('');

    } catch (error) {
      console.log('Erro ao adicionar solução:', error);
    }
  };

  return (
    <div>
      <textarea 
        placeholder="Digite sua solução"
        value={solucao}
        onChange={(e) => setSolucao(e.target.value)}
      />
      <button onClick={adicionarSolucao}>Adicionar Solução</button>
    </div>
  );
}

export default Solucoes;
