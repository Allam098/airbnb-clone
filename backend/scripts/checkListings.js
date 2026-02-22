const mongoose = require("mongoose");
const Listing = require("../models/listing");

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
const dbUrl = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/wanderlust";
mongoose.connect(dbUrl)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

async function checkListings() {
  try {
    const count = await Listing.countDocuments();
    console.log(`\n📊 Total Listings in Database: ${count}\n`);

    if (count === 0) {
      console.log("⚠️  No listings found in database!");
      console.log("\nTo add sample listings, run:");
      console.log("  npm run seed\n");
    } else {
      const listings = await Listing.find({}).limit(5);
      console.log("📋 Sample Listings:\n");
      listings.forEach((listing, index) => {
        console.log(`${index + 1}. ${listing.title}`);
        console.log(`   Price: ₹${listing.price}`);
        console.log(`   Location: ${listing.location}, ${listing.country}`);
        console.log(`   Category: ${listing.category || 'N/A'}`);
        console.log("");
      });
    }

    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

checkListings();
