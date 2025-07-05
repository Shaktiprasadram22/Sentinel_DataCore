const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
const mongoUri = process.env.MONGO_URI;
let isConnected = false;

async function connectDB() {
  if (!isConnected) {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  }
}

// --- Mongoose Schemas ---
const newsSchema = new mongoose.Schema(
  {
    headline: String,
    content: String,
    relatedStocks: [String],
  },
  { collection: "news" }
);

const stockSchema = new mongoose.Schema(
  {
    symbol: String,
    sector: String,
    lastPrice: Number,
    volume: Number,
    resistance: Number,
    support: Number,
  },
  { collection: "stocks" }
);

const News = mongoose.models.News || mongoose.model("News", newsSchema);
const Stock = mongoose.models.Stock || mongoose.model("Stock", stockSchema);

// --- API Endpoints ---

// Get all news
app.get("/api/news", async (req, res) => {
  await connectDB();
  const news = await News.find({});
  res.json(news);
});

// Get all stocks
app.get("/api/stocks", async (req, res) => {
  await connectDB();
  const stocks = await Stock.find({});
  res.json(stocks);
});

// Get single stock by symbol
app.get("/api/stocks/:symbol", async (req, res) => {
  await connectDB();
  const stock = await Stock.findOne({ symbol: req.params.symbol });
  if (!stock) return res.status(404).json({ message: "Stock not found" });
  res.json(stock);
});

// Get single news by ID
app.get("/api/news/:id", async (req, res) => {
  await connectDB();
  const news = await News.findById(req.params.id);
  if (!news) return res.status(404).json({ message: "News not found" });
  res.json(news);
});
// Get news by relatedStocks symbol
app.get("/api/news/related/:symbol", async (req, res) => {
  await connectDB();
  const symbol = req.params.symbol;
  const news = await News.find({ relatedStocks: symbol });
  if (!news || news.length === 0) {
    return res
      .status(404)
      .json({ message: "No news found for this stock symbol" });
  }
  res.json(news);
});
// Root endpoint
app.get("/api", (req, res) => {
  res.json({ message: "SentinelDataCore API is running (Netlify Functions)" });
});

module.exports.handler = serverless(app);
