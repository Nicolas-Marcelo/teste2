const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const porta = 8080;

const app = express();
app.use(cors( { origin: 'http://localhost:3000'} ));
app.use(express.json());

const serviceAccount = require('./correcttask-firebase-adminsdk-99r4a-f399d612ad.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const RotaDesafios = require('./desafios');
app.use('/desafios', RotaDesafios);

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
