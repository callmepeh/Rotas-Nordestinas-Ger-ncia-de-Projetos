const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Rotas e middlewares seriam adicionados aqui
const authRoutes = require("./routes/authRoutes.js");
app.use("/auth", authRoutes);