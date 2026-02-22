const mongoose = require("mongoose");
const Listing = require("../models/listing");

mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");

async function updateListings() {
  try {

    const result = await Listing.updateMany(
      { category: { $exists: false } },
      { $set: { category: "Trending" } }
    );

    console.log("Modified:", result.modifiedCount);
    console.log("✅ All old listings updated!");

    mongoose.connection.close();

  } catch (err) {
    console.log(err);
  }
}

updateListings();