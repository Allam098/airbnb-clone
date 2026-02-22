const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn } = require("../middleware/middleware.js");
const reviewController = require("../controllers/reviews.js");


// Create Review Route
router.route("/")
  .post(
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview)
  );


// Delete Review Route
router.route("/:reviewId")
  .delete(
    isLoggedIn,
    wrapAsync(reviewController.destroyReview)
  );


module.exports = router;
