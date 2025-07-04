// server.js
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const stockRoutes = require("./routes/stockRoutes");
const newsRoutes = require("./routes/newsRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

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
