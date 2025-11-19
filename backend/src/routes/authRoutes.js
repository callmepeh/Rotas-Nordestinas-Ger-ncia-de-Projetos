// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// Rotas públicas
router.post("/register", authController.register);
router.post("/login", authController.login);

// Rotas protegidas
router.get("/me", authMiddleware, authController.me);
router.put("/update/:id", authMiddleware, authController.updateProfile);

module.exports = router;
