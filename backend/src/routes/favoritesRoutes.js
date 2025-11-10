const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favoritesController");

router.post("/add", favoritesController.adicionarFavorito);
router.delete("/remove", favoritesController.removerFavorito);
router.get("/:userID", favoritesController.listarFavoritos);

module.exports = router;
