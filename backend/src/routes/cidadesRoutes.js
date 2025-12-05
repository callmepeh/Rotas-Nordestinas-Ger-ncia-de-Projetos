const express = require("express");
const router = express.Router();
const cidadesController = require("../controllers/cidadesController");

router.get("/", cidadesController.listarTodas);
router.get("/buscar", cidadesController.buscarPorNome);
router.get("/estado/:estadoID", cidadesController.listarPorEstado);
router.get("/:id", cidadesController.buscarPorId);

module.exports = router;
