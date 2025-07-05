// // clearData.js
// require("dotenv").config();
// const mongoose = require("mongoose");
// const Stock = require("./models/Stock");
// const News = require("./models/News");
// const connectDB = require("./config/db");

// async function clearAll() {
//   await connectDB();
//   await Stock.deleteMany({});
//   await News.deleteMany({});
//   console.log("✅ All stocks and news deleted!");
//   mongoose.disconnect();
// }

// clearAll();
