// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Carrega as variáveis de ambiente

const app = express();
const PORT = process.env.PORT || 5000; // Usa a porta do .env ou padrão 5000

// Middlewares
app.use(cors()); // Habilita o CORS para todas as rotas
app.use(express.json()); // Permite o parsing de corpos de requisição JSON

const localizacoesRoutes = require('./routes/localizacoesRoutes');
app.use('/api/localizacoes', localizacoesRoutes);

const cidadesRoutes = require('./routes/cidadesRoutes');
app.use('/api/cidades', cidadesRoutes);

const usuariosRoutes = require('./routes/usuariosRoutes');
app.use('/api/usuarios', usuariosRoutes);

const favoriteRoutes = require('./routes/favoriteRoutes'); // Importe o novo ficheiro
app.use('/api/favoritos', favoriteRoutes); // Use as novas rotas

// Rota de teste básica
app.get('/', (req, res) => {
    res.send('API Node.js está online!');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});