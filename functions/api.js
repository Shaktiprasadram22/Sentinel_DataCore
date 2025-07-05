const serverless = require("serverless-http");
const express = require("express");
const app = express();

// ...your routes and middleware here...
app.get("/stocks", (req, res) => {
  res.json({ message: "Stocks endpoint!" });
});

// Export the handler
module.exports.handler = serverless(app);
