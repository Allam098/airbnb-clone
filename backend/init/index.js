const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

// Load environment variables
require('dotenv').config();

const connectDB = async () => {
  try {
    const dbUrl = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/wanderlust";
    await mongoose.connect(dbUrl);
    console.log("MongoDB connected successfully ✅");
  } catch (err) {
    console.error("MongoDB connection failed ❌", err);
    process.exit(1);
  }
};

const initDB = async () => {
  try {
    console.log("\n🗑️  Clearing existing listings...");
    await Listing.deleteMany({});

    console.log("👤 Looking for existing user...");
    let user = await User.findOne();

    if (!user) {
      console.log("⚠️  No user found. Creating default user 'vamsi'...");
      
      // Create default user 'vamsi'
      const defaultUser = new User({
        username: "vamsi",
        email: "vamsikrishnaallam7@gmail.com",
        role: "admin"
      });

      try {
        user = await User.register(defaultUser, "Vamsi@2024");
        console.log("✅ Default user created!");
        console.log("   Username: vamsi");
        console.log("   Password: Vamsi@2024");
        console.log("   Role: admin");
      } catch (err) {
        console.error("❌ Error creating user:", err.message);
        mongoose.connection.close();
        return;
      }
    } else {
      console.log(`✅ Found user: ${user.username}`);
    }

    console.log("\n📦 Inserting sample listings...");
    const updatedData = initData.data.map((obj) => ({
      ...obj,
      owner: user._id
    }));

    await Listing.insertMany(updatedData);

    console.log(`✅ Successfully added ${updatedData.length} listings!`);
    console.log("\n" + "═".repeat(50));
    console.log("  DATABASE INITIALIZED");
    console.log("═".repeat(50));
    console.log(`  Total Listings: ${updatedData.length}`);
    console.log(`  Owner: ${user.username}`);
    console.log("═".repeat(50));
    console.log("\n🌐 You can now access your app and see the listings!\n");
    
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error during initialization:", err);
    mongoose.connection.close();
  }
};

connectDB().then(initDB);
