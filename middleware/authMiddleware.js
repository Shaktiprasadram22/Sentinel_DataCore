// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

// Middleware to protect routes using JWT
module.exports = function (req, res, next) {
  // Check for token in Authorization header
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
