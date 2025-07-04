// models/News.js
const mongoose = require("mongoose");

// News schema (no sentiment field)
const newsSchema = new mongoose.Schema({
  headline: { type: String, required: true },
  content: String,
  relatedStocks: [String], // array of stock symbols
  publishedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("News", newsSchema);
