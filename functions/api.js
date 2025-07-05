const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Example: GET /api/news
app.get("/api/news", (req, res) => {
  res.json([
    { headline: "Sample News 1", content: "This is a sample news article." },
    { headline: "Sample News 2", content: "Another sample news article." },
  ]);
});

// Example: GET /api/stocks
app.get("/api/stocks", (req, res) => {
  res.json([
    { symbol: "RELIANCE.NS", price: 2850.1 },
    { symbol: "TCS.NS", price: 3984.4 },
  ]);
});

// Example: GET /api/stocks/:symbol
app.get("/api/stocks/:symbol", (req, res) => {
  const { symbol } = req.params;
  // For demonstration, just return the symbol
  res.json({ symbol, price: Math.random() * 4000 });
});

// Example: Root endpoint
app.get("/api", (req, res) => {
  res.json({ message: "SentinelDataCore API is running (Netlify Functions)" });
});

module.exports.handler = serverless(app);
