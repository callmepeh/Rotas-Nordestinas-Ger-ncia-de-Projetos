const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first');

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
console.log("URL:", process.env.SUPABASE_URL);
console.log("ROLE KEY:", process.env.SUPABASE_SERVICE_ROLE ? "OK" : "Vazia");

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

const dicasRoutes = require("./routes/dicasRoutes.js");
app.use("/dicas", dicasRoutes);

const comentariosRoutes = require("./routes/comentariosRoutes.js");
app.use("/comentarios", comentariosRoutes);

const comoChegarRoutes = require("./routes/comoChegarRoutes.js");
app.use("/como-chegar", comoChegarRoutes);

// Start
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
