// server.js
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const stockRoutes = require("./routes/stockRoutes");
const newsRoutes = require("./routes/newsRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// 1. Add rate limiter code here
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});

// 2. Apply the rate limiter to all requests
app.use(limiter);

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// API Routes
app.use("/api/stocks", stockRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/auth", authRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("SentinelDataCore API is running");
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
