const Booking = require("../models/booking");
const Listing = require("../models/listing");
const User = require("../models/user");
const Review = require("../models/review");

module.exports.dashboard = async (req, res) => {
  try {
    // Total counts
    const totalListings = await Listing.countDocuments();
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalBookings = await Booking.countDocuments();
    const totalRevenue = await Booking.aggregate([
      { $match: { status: { $in: ["confirmed", "completed"] } } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    // Recent bookings
    const recentBookings = await Booking.find({})
      .populate("listing")
      .populate("user")
      .sort({ createdAt: -1 })
      .limit(10);

    // Bookings by status
    const bookingsByStatus = await Booking.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    // Top listings by bookings
    const topListings = await Booking.aggregate([
      { $match: { status: { $in: ["confirmed", "completed"] } } },
      { $group: { _id: "$listing", bookingCount: { $sum: 1 }, revenue: { $sum: "$totalPrice" } } },
      { $sort: { bookingCount: -1 } },
      { $limit: 5 }
    ]);

    // Populate listing details
    await Listing.populate(topListings, { path: "_id" });

    // Monthly revenue (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyRevenue = await Booking.aggregate([
      { 
        $match: { 
          status: { $in: ["confirmed", "completed"] },
          createdAt: { $gte: sixMonthsAgo }
        } 
      },
      {
        $group: {
          _id: { 
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          revenue: { $sum: "$totalPrice" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    res.render("admin/dashboard", {
      totalListings,
      totalUsers,
      totalBookings,
      totalRevenue: totalRevenue[0]?.total || 0,
      recentBookings,
      bookingsByStatus,
      topListings,
      monthlyRevenue
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Could not load dashboard!");
    res.redirect("/listings");
  }
};
