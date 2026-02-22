const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isAdmin } = require("../middleware/middleware");
const analyticsController = require("../controllers/analytics");

// Admin dashboard
router.get("/admin/dashboard", isLoggedIn, isAdmin, wrapAsync(analyticsController.dashboard));

module.exports = router;
