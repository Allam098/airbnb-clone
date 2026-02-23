const mongoose = require("mongoose");
const User = require("../models/user");
const Listing = require("../models/listing");

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
const dbUrl = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/wanderlust";
mongoose.connect(dbUrl)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

async function changeOwner() {
  try {
    console.log("\n🔍 Looking for user 'vamsi'...\n");
    
    let vamsiUser = await User.findOne({ username: "vamsi" });
    
    if (!vamsiUser) {
      console.log("⚠️  User 'vamsi' not found. Creating new user...\n");
      
      // Create vamsi user
      const newUser = new User({
        username: "vamsi",
        email: "vamsikrishnaallam7@gmail.com",
        role: "admin"
      });

      try {
        vamsiUser = await User.register(newUser, "Vamsi@2024");
        console.log("✅ User 'vamsi' created successfully!");
        console.log("   Username: vamsi");
        console.log("   Password: Vamsi@2024");
        console.log("   Email: vamsikrishnaallam7@gmail.com");
        console.log("   Role: admin\n");
      } catch (err) {
        console.error("❌ Error creating user:", err.message);
        process.exit(1);
      }
    } else {
      console.log(`✅ Found user 'vamsi' (ID: ${vamsiUser._id})\n`);
    }

    // Update all listings to have vamsi as owner
    console.log("🔄 Updating all listings to owner 'vamsi'...\n");
    
    const result = await Listing.updateMany(
      {}, 
      { $set: { owner: vamsiUser._id } }
    );

    console.log("═".repeat(50));
    console.log("  OWNERSHIP TRANSFER COMPLETE");
    console.log("═".repeat(50));
    console.log(`  Listings updated: ${result.modifiedCount}`);
    console.log(`  New owner: vamsi`);
    console.log(`  Owner ID: ${vamsiUser._id}`);
    console.log("═".repeat(50));
    console.log("\n✅ All listings are now owned by 'vamsi'!\n");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

changeOwner();
