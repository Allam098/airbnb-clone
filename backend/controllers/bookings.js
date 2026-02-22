const Booking = require("../models/booking");
const Listing = require("../models/listing");
const { sendBookingConfirmation } = require("../config/emailConfig");

// Check if dates are available
module.exports.checkAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { checkIn, checkOut } = req.query;

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Find overlapping bookings
    const overlappingBookings = await Booking.find({
      listing: id,
      status: { $in: ["confirmed", "pending"] },
      $or: [
        { checkIn: { $lte: checkOutDate }, checkOut: { $gte: checkInDate } }
      ]
    });

    res.json({
      available: overlappingBookings.length === 0,
      bookings: overlappingBookings
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create booking
module.exports.createBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { checkIn, checkOut, guests } = req.body;

    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Validate dates
    if (checkInDate >= checkOutDate) {
      req.flash("error", "Check-out date must be after check-in date!");
      return res.redirect(`/listings/${id}`);
    }

    if (checkInDate < new Date()) {
      req.flash("error", "Check-in date cannot be in the past!");
      return res.redirect(`/listings/${id}`);
    }

    // Check availability
    const overlappingBookings = await Booking.find({
      listing: id,
      status: { $in: ["confirmed", "pending"] },
      $or: [
        { checkIn: { $lte: checkOutDate }, checkOut: { $gte: checkInDate } }
      ]
    });

    if (overlappingBookings.length > 0) {
      req.flash("error", "Sorry, this property is not available for the selected dates!");
      return res.redirect(`/listings/${id}`);
    }

    // Calculate total price
    const days = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const totalPrice = listing.price * days;

    // Create booking
    const booking = new Booking({
      listing: id,
      user: req.user._id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      totalPrice,
      status: "confirmed"
    });

    await booking.save();

    // Send confirmation email - will throw error if it fails
    try {
      await sendBookingConfirmation(req.user.email, {
        username: req.user.username,
        listingTitle: listing.title,
        checkIn: checkInDate.toLocaleDateString(),
        checkOut: checkOutDate.toLocaleDateString(),
        guests,
        totalPrice
      });
      
      req.flash("success", "Booking confirmed! Confirmation email sent to your inbox.");
    } catch (emailErr) {
      console.error("Failed to send booking confirmation email:", emailErr);
      // Booking is still saved, but email failed
      req.flash("success", "Booking confirmed! However, we couldn't send the confirmation email. Please check your bookings page.");
    }
    
    res.redirect("/bookings/my-bookings");
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong!");
    res.redirect(`/listings/${req.params.id}`);
  }
};

// View user's bookings
module.exports.myBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("listing")
      .sort({ createdAt: -1 });

    res.render("bookings/myBookings", { bookings });
  } catch (err) {
    console.error(err);
    req.flash("error", "Could not load bookings!");
    res.redirect("/listings");
  }
};

// Cancel booking
module.exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
      req.flash("error", "Booking not found!");
      return res.redirect("/bookings/my-bookings");
    }

    if (!booking.user.equals(req.user._id)) {
      req.flash("error", "You don't have permission!");
      return res.redirect("/bookings/my-bookings");
    }

    booking.status = "cancelled";
    await booking.save();

    req.flash("success", "Booking cancelled successfully!");
    res.redirect("/bookings/my-bookings");
  } catch (err) {
    console.error(err);
    req.flash("error", "Could not cancel booking!");
    res.redirect("/bookings/my-bookings");
  }
};

// Admin: View all bookings
module.exports.allBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("listing")
      .populate("user")
      .sort({ createdAt: -1 });

    res.render("bookings/allBookings", { bookings });
  } catch (err) {
    console.error(err);
    req.flash("error", "Could not load bookings!");
    res.redirect("/admin/dashboard");
  }
};
