// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new admin user
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = new User({ username, password: hash });
    await user.save();

    res.json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login and get JWT token
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const payload = { userId: user._id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
