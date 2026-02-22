const mongoose = require("mongoose");
const User = require("../models/user");

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
const dbUrl = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/wanderlust";
mongoose.connect(dbUrl)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

async function fixAdmin() {
  try {
    console.log("\n🔍 Checking for admin user...\n");
    
    // Find and delete any existing admin users
    const existingAdmins = await User.find({ 
      $or: [
        { username: "admin" },
        { username: "wanderlust_admin" },
        { role: "admin" }
      ]
    });
    
    if (existingAdmins.length > 0) {
      console.log("✅ Found existing admin user(s):");
      existingAdmins.forEach(admin => {
        console.log("   Username:", admin.username);
        console.log("   Email:", admin.email);
        console.log("   Role:", admin.role);
      });
      console.log("\n🔄 Deleting old admin user(s)...\n");
      
      // Delete all existing admin users
      await User.deleteMany({ 
        $or: [
          { username: "admin" },
          { username: "wanderlust_admin" },
          { role: "admin" }
        ]
      });
      console.log("   Deleted old admin user(s)");
    } else {
      console.log("❌ No admin user found. Creating new one...\n");
    }

    // Create fresh admin user with new credentials
    const newAdmin = new User({
      username: "wanderlust_admin",
      email: "admin@wanderlust.com",
      role: "admin"
    });

    // Register with password
    await User.register(newAdmin, "WanderLust@2024");

    console.log("✅ Admin user created successfully!\n");
    console.log("═".repeat(50));
    console.log("  LOGIN CREDENTIALS");
    console.log("═".repeat(50));
    console.log("  Username: wanderlust_admin");
    console.log("  Password: WanderLust@2024");
    console.log("  Email:    admin@wanderlust.com");
    console.log("  Role:     admin");
    console.log("═".repeat(50));
    console.log("\n🌐 Login URLs:");
    console.log("   Admin Portal: http://localhost:8080/admin/login");
    console.log("   Regular Login: http://localhost:8080/login");
    console.log("\n");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

fixAdmin();
