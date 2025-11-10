// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const cidadesRoutes = require('./routes/cidadesRoutes.js');
app.use('/api/cidades', cidadesRoutes);

app.get('/', (req, res) => {
  res.send('API Node.js está online!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
