require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rotas
const authRoutes = require("./routes/authRoutes.js");
app.use("/auth", authRoutes);

const cidadesRoutes = require("./routes/cidadesRoutes.js");
app.use("/cidades", cidadesRoutes);

const favoritesRoutes = require("./routes/favoritesRoutes.js");
app.use("/favoritos", favoritesRoutes);

const pontosRoutes = require("./routes/pontosTuristicosRoutes.js");
app.use("/pontos", pontosRoutes);

const atividadesRoutes = require("./routes/atividadesRoutes.js");
app.use("/atividades", atividadesRoutes);

const comentariosRoutes = require("./routes/comentariosRoutes.js");
app.use("/comentarios", comentariosRoutes);

const comoChegarRoutes = require("./routes/comoChegarRoutes.js");
app.use("/como-chegar", comoChegarRoutes);

// Start
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
