const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isAdmin } = require("../middleware/middleware");
const bookingController = require("../controllers/bookings");

// Check availability (API endpoint)
router.get("/listings/:id/availability", wrapAsync(bookingController.checkAvailability));

// Create booking
router.post("/listings/:id/book", isLoggedIn, wrapAsync(bookingController.createBooking));

// User's bookings
router.get("/bookings/my-bookings", isLoggedIn, wrapAsync(bookingController.myBookings));

// Cancel booking
router.post("/bookings/:id/cancel", isLoggedIn, wrapAsync(bookingController.cancelBooking));

// Admin: View all bookings
router.get("/admin/bookings", isLoggedIn, isAdmin, wrapAsync(bookingController.allBookings));

module.exports = router;
