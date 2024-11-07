const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const db = admin.firestore();

const colecaoDesafio = db.collection('desafios');
const colecaoSolucao = db.collection('solucoes');

router.get('/', async (req, res) => {
  try {
    const desafiosSnapshot = await colecaoDesafio.get();
    const desafios = await Promise.all(
      desafiosSnapshot.docs.map(async (doc) => {
        const desafioData = doc.data();
        const solucoes = await Promise.all(
          (desafioData.solucoes || []).map(async (solucaoId) => {
            const solucaoDoc = await colecaoSolucao.doc(solucaoId).get();
            return solucaoDoc.exists ? { id: solucaoDoc.id, ...solucaoDoc.data() } : null;
          })
        );

        return {
          id: doc.id,
          desafio: desafioData.desafio,
          descricao: desafioData.descricao,
          criterios: desafioData.criterios,
          autorId: desafioData.autorId,
          recompensa: desafioData.recompensa,
          solucoes: solucoes.filter((solucao) => solucao),
        };
      })
    );

    res.json(desafios);
  } catch (error) {
    console.error('A 5 passos de pular  da ponte, erro no endPoint desafios:', error);
    res.status(500).json({ error: 'Erro ao obter desafios' });
  }
})

// NÃO MECHER O UNICO ALEM DE PEGAR QUE FUNCIONA
router.post('/', async (req, res) => {
  const { desafio, recompensa, descricao, comunicacao, criterios, autorId } = req.body;

  try {
    const desafioRecebido = await db.collection('desafios').add({
      desafio,
      recompensa,
      descricao,
      comunicacao,
      criterios: (criterios),
      autorId,
    });

    res.status(200).json({ message: 'Um pequeno passo para o homem, mas um gigantesco passo para a humanidade!', desafioId: desafioRecebido.id });
  } catch (error) {
    res.status(500).json({error: 'Ohhh mundo cruel'})
    console.log('Amém, nãooooooo', error);
  }
});

// CARTA DE SUICIDIO
router.get('/:desafioId', async (req, res) => {
  const { desafioId } = req.params;

  try {
    const desafioDoc = await colecaoDesafio.doc(desafioId).get();
    if (!desafioDoc.exists) {
      return res.status(404).json({ error: 'Desafio não encontrado' });
    }

    const desafioData = desafioDoc.data();

    const solucoes = await Promise.all(
      (desafioData.solucoes || []).map(async (solucaoId) => {
        const solucaoDoc = await colecaoSolucao.doc(solucaoId).get();
        return solucaoDoc.exists ? { id: solucaoDoc.id, ...solucaoDoc.data() } : null;
      })
    );

    res.status(200).json({
      id: desafioDoc.id,
      desafio: desafioData.desafio,
      descricao: desafioData.descricao,
      comunicacao: desafioData.comunicacao,
      criterios: desafioData.criterios,
      autorId: desafioData.autorId,
      recompensa: desafioData.recompensa,
      solucoes: solucoes.filter((solucao) => solucao),

    });

  } catch (error) {
    console.error('Me mata de uma vezzzzzzzzzzzzzzzz', error);
    res.status(500).json({ error: 'Me mata de uma vezzzzzzzzzzzzzzzz' });
  }
  console.log(desafioDoc.id)
});

/*
// TENTACTIVISTE DE PEGAR O DESAFIO DETALHADO
router.get('/:desafioId', async (req, res) => {
  const { desafioId } = req.params;

  try {
    const desafioDoc = await colecaoDesafio.doc(desafioId).get();
    if (!desafioDoc.exists) {
      return res.status(404).json({ error: 'Desafio não encontrado' });
    }

    const desafioData = desafioDoc.data();

    const solucoes = await Promise.all(
      (desafioData.solucoes || []).map(async (solucaoId) => {
        const solucaoDoc = await colecaoSolucao.doc(solucaoId).get();
        return solucaoDoc.exists ? { id: solucaoDoc.id, ...solucaoDoc.data() } : null;
      })
    );

    res.status(200).json({
      id: desafioDoc.id,
      desafio: desafioData.desafio,
      descricao: desafioData.descricao,
      comunicacao: desafioData.comunicacao,
      criterios: desafioData.criterios,
      autorId: desafioData.autorId,
      recompensa: desafioData.recompensa,
      solucoes: solucoes.filter((solucao) => solucao),
    });
  } catch (error) {
    console.error('Erro ao buscar desafio:', error);
    res.status(500).json({ error: 'Erro ao buscar desafio' });
  }
});

 */

module.exports = router;