const mongoose = require("mongoose");
const User = require("../models/user");

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
const dbUrl = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/wanderlust";
mongoose.connect(dbUrl)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

async function resetAdminPassword() {
  try {
    // Find admin user
    const admin = await User.findOne({ username: "admin" });
    
    if (!admin) {
      console.log("❌ Admin user not found!");
      console.log("Run 'npm run create-admin' to create an admin user.");
      process.exit(1);
    }

    // Reset password to admin123
    await admin.setPassword("admin123");
    admin.role = "admin"; // Ensure role is set
    await admin.save();

    console.log("\n✅ Admin password reset successfully!\n");
    console.log("Login credentials:");
    console.log("─".repeat(40));
    console.log("Username: admin");
    console.log("Password: admin123");
    console.log("Email:", admin.email);
    console.log("Role:", admin.role);
    console.log("─".repeat(40));
    console.log("\nYou can now login at: http://localhost:8080/admin/login\n");

    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

resetAdminPassword();
