const mongoose = require("mongoose");
const User = require("../models/user");

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
const dbUrl = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/wanderlust";
mongoose.connect(dbUrl)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Get username from command line argument
const username = process.argv[2];

if (!username) {
  console.log("Usage: node makeAdmin.js <username>");
  process.exit(1);
}

async function makeAdmin() {
  try {
    const user = await User.findOne({ username: username });
    
    if (!user) {
      console.log(`User "${username}" not found!`);
      process.exit(1);
    }

    user.role = "admin";
    await user.save();

    console.log(`✅ User "${username}" is now an admin!`);
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

makeAdmin();
