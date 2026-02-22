const mongoose = require("mongoose");
const User = require("../models/user");

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
const dbUrl = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/wanderlust";
mongoose.connect(dbUrl)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

async function checkUsers() {
  try {
    const users = await User.find({});
    
    console.log("\n📋 ALL USERS IN DATABASE:\n");
    console.log("═".repeat(80));
    
    if (users.length === 0) {
      console.log("  No users found in database!");
    } else {
      users.forEach((user, index) => {
        console.log(`\n  User ${index + 1}:`);
        console.log(`  ├─ Username: ${user.username}`);
        console.log(`  ├─ Email: ${user.email}`);
        console.log(`  ├─ Role: ${user.role || "user"}`);
        console.log(`  └─ ID: ${user._id}`);
      });
    }
    
    console.log("\n" + "═".repeat(80));
    console.log(`\n  Total users: ${users.length}\n`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

checkUsers();
