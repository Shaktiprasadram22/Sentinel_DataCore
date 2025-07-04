// // controllers/newsController.js
// const News = require("../models/News");

// // Get all news articles
// exports.getNews = async (req, res) => {
//   try {
//     const news = await News.find().sort({ publishedAt: -1 });
//     res.json(news);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Get a single news article by ID
// exports.getNewsById = async (req, res) => {
//   try {
//     const news = await News.findById(req.params.id);
//     if (!news) return res.status(404).json({ message: "News not found" });
//     res.json(news);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Add news article (admin only)
// exports.addNews = async (req, res) => {
//   try {
//     const { headline, content, relatedStocks } = req.body;
//     const news = new News({
//       headline,
//       content,
//       relatedStocks,
//     });
//     await news.save();
//     res.json(news);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Update news article (admin only)
// exports.updateNews = async (req, res) => {
//   try {
//     const updates = req.body;
//     const news = await News.findByIdAndUpdate(req.params.id, updates, {
//       new: true,
//     });
//     if (!news) return res.status(404).json({ message: "News not found" });
//     res.json(news);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Delete news article (admin only)
// exports.deleteNews = async (req, res) => {
//   try {
//     const news = await News.findByIdAndDelete(req.params.id);
//     if (!news) return res.status(404).json({ message: "News not found" });
//     res.json({ message: "News deleted" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// ////////////////////////
// controllers/newsController.js
const News = require("../models/News");
const { cache } = require("../middleware/cacheMiddleware");

/**
 * Get all news articles
 * Public endpoint
 */
exports.getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ publishedAt: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get a single news article by ID
 * Public endpoint
 */
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Add news article(s)
 * Admin only, supports both single and bulk insert
 */
exports.addNews = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      // Bulk insert
      const news = await News.insertMany(req.body);
      res.json(news);
    } else {
      // Single insert
      const { headline, content, relatedStocks } = req.body;
      const news = new News({
        headline,
        content,
        relatedStocks,
      });
      await news.save();
      res.json(news);
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update a news article by ID
 * Admin only
 */
exports.updateNews = async (req, res) => {
  try {
    const updates = req.body;
    const news = await News.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Delete a news article by ID
 * Admin only
 */
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json({ message: "News deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
