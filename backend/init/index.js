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
    await Listing.deleteMany({});

    const user = await User.findOne();

    if (!user) {
      console.log("No user found. Please signup first.");
      mongoose.connection.close();
      return;
    }

    const updatedData = initData.data.map((obj) => ({
      ...obj,
      owner: user._id
    }));

    await Listing.insertMany(updatedData);

    console.log("Data initialized with owner ✅");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
};

connectDB().then(initDB);
