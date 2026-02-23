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

async function forceChangeOwner() {
  try {
    console.log("\n📊 Checking current ownership...\n");
    
    // Get all listings with their owners
    const listings = await Listing.find({}).populate('owner');
    console.log(`Total listings found: ${listings.length}`);
    
    if (listings.length > 0) {
      const ownerCounts = {};
      listings.forEach(listing => {
        const ownerName = listing.owner ? listing.owner.username : 'No owner';
        ownerCounts[ownerName] = (ownerCounts[ownerName] || 0) + 1;
      });
      
      console.log("\nCurrent ownership distribution:");
      Object.entries(ownerCounts).forEach(([owner, count]) => {
        console.log(`  - ${owner}: ${count} listings`);
      });
    }
    
    console.log("\n🔍 Looking for user 'vamsi'...\n");
    
    let vamsiUser = await User.findOne({ username: "vamsi" });
    
    if (!vamsiUser) {
      console.log("⚠️  User 'vamsi' not found. Creating new user...\n");
      
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

    // Force update ALL listings
    console.log("🔄 Transferring ALL listings to 'vamsi'...\n");
    
    const result = await Listing.updateMany(
      {}, 
      { owner: vamsiUser._id }
    );

    console.log("═".repeat(50));
    console.log("  OWNERSHIP TRANSFER COMPLETE");
    console.log("═".repeat(50));
    console.log(`  Total listings: ${listings.length}`);
    console.log(`  Listings updated: ${result.modifiedCount}`);
    console.log(`  New owner: vamsi`);
    console.log(`  Owner ID: ${vamsiUser._id}`);
    console.log("═".repeat(50));
    console.log("\n✅ All listings are now owned by 'vamsi'!\n");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    console.error(err);
    process.exit(1);
  }
}

forceChangeOwner();
