const express = require("express");
const router = express.Router();
const controller = require("../controllers/comentariosController.js");

router.post("/", controller.adicionar);
router.get("/:cidadeId", controller.listarPorCidade);
router.put("/:id", controller.editar);         // editar
router.delete("/:id", controller.deletar);     // deletar

module.exports = router;
