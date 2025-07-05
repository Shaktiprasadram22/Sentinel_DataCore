// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// Register a new admin (for initial setup, remove or secure after first use)
// router.post("/register", register);

// Login
router.post("/login", login);

module.exports = router;
