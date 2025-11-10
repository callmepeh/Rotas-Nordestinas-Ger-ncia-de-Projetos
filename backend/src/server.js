const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rotas
const authRoutes = require("./routes/authRoutes.js");
app.use("/auth", authRoutes);

const cidadesRoutes = require("./routes/cidadesRoutes.js");
app.use("/cidades", cidadesRoutes);

const favoritesRoutes = require("./routes/favoritesRoutes");
app.use("/favoritos", favoritesRoutes);


// Start
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
