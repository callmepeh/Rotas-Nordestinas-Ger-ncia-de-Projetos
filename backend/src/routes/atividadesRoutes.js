const express = require("express");
const router = express.Router();
const controller = require("../controllers/atividadesController");

router.get("/:cidadeId", controller.listarPorCidade);

module.exports = router;
