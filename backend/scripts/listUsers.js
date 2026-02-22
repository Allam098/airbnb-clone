const mongoose = require("mongoose");
const User = require("../models/user");

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
const dbUrl = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/wanderlust";
mongoose.connect(dbUrl)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

async function listUsers() {
  try {
    const users = await User.find({}).select("username email role");
    
    console.log("\n📋 All Users:\n");
    console.log("Username\t\tEmail\t\t\t\tRole");
    console.log("─".repeat(70));
    
    users.forEach(user => {
      console.log(`${user.username}\t\t${user.email}\t\t${user.role || "user"}`);
    });
    
    console.log("\n");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

listUsers();
