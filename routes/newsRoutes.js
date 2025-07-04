// routes/newsRoutes.js
const express = require("express");
const router = express.Router();
const {
  getNews,
  getNewsById,
  addNews,
  updateNews,
  deleteNews,
} = require("../controllers/newsController");
const auth = require("../middleware/authMiddleware");
const cache = require("../middleware/cacheMiddleware");

// Public: get all news or a single news article
router.get("/", cache, getNews);
router.get("/:id", cache, getNewsById);

// Protected: add, update, delete news
router.post("/", auth, addNews);
router.put("/:id", auth, updateNews);
router.delete("/:id", auth, deleteNews);

module.exports = router;
