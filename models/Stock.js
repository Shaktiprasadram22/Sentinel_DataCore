// models/Stock.js
const mongoose = require("mongoose");

// Stock schema
const stockSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  sector: String,
  lastPrice: Number,
  volume: Number,
  resistance: Number,
  support: Number,
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Stock", stockSchema);
