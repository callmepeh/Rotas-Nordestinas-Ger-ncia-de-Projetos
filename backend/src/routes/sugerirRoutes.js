const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const { sugerirRota } = require("../controllers/sugerirRoutesController.js");

const router = express.Router();

router.post("/", authMiddleware, sugerirRota);

module.exports = router;
