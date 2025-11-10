const express = require("express");
const router = express.Router();
const controller = require("../controllers/comoChegarController.js");

router.get("/:cidadeId", controller.listarPorCidade);

module.exports = router;
