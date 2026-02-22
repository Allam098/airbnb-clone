const mongoose = require("mongoose");
const User = require("../models/user");

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
const dbUrl = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/wanderlust";
mongoose.connect(dbUrl)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: "admin" });
    
    if (existingAdmin) {
      console.log("⚠️  Admin user already exists!");
      console.log(`Username: ${existingAdmin.username}`);
      console.log(`Email: ${existingAdmin.email}`);
      console.log(`Role: ${existingAdmin.role}`);
      
      if (existingAdmin.role !== "admin") {
        existingAdmin.role = "admin";
        await existingAdmin.save();
        console.log("✅ Updated existing user to admin role!");
      }
      
      process.exit(0);
    }

    // Create new admin user
    const adminUser = new User({
      username: "admin",
      email: "admin@wanderlust.com",
      role: "admin"
    });

    // Register with password
    await User.register(adminUser, "admin123");

    console.log("\n✅ Admin user created successfully!\n");
    console.log("Login credentials:");
    console.log("─".repeat(40));
    console.log("Username: admin");
    console.log("Password: admin123");
    console.log("Email: admin@wanderlust.com");
    console.log("Role: admin");
    console.log("─".repeat(40));
    console.log("\nYou can now login at: http://localhost:8080/login\n");

    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

createAdmin();
