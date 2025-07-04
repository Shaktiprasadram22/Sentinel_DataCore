// routes/stockRoutes.js
const express = require("express");
const router = express.Router();
const {
  getStocks,
  getStock,
  addStock,
  updateStock,
  deleteStock,
} = require("../controllers/stockController");
const auth = require("../middleware/authMiddleware");
const cache = require("../middleware/cacheMiddleware");

// Public: get all stocks or a single stock
router.get("/", cache, getStocks);
router.get("/:symbol", cache, getStock);

// Protected: add, update, delete stock
router.post("/", auth, addStock);
router.put("/:symbol", auth, updateStock);
router.delete("/:symbol", auth, deleteStock);

module.exports = router;
