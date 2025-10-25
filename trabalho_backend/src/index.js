// src/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const bibliotecaRouter = require('./routes/biblioteca');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/livros', bibliotecaRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Back-end rodando na porta ${PORT}`);
});
