// seedAdmin.js
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const connectDB = require("./config/db");

async function createAdmin() {
  await connectDB();

  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  // Check if admin already exists
  let user = await User.findOne({ username });
  if (user) {
    console.log("Admin user already exists.");
    mongoose.disconnect();
    return;
  }

  // Hash the password and create the user
  const hashedPassword = await bcrypt.hash(password, 10);
  user = new User({ username, password: hashedPassword });
  await user.save();
  console.log("✅ Admin user created: shakti / shakti");
  mongoose.disconnect();
}

createAdmin();
