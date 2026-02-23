const express = require("express");
const router = express.Router();
const multer = require("multer");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwnerOrAdmin, validateListing } = require("../middleware/middleware.js");
const listingController = require("../controllers/listings.js");
const { storage } = require("../config/cloudConfig.js");
const upload = multer({ storage });



// Index Route & Create Route
router.route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// New Route
router.route("/new")
  .get(isLoggedIn, listingController.renderNewForm);


// Show, Update & Delete Routes
router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isOwnerOrAdmin,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isOwnerOrAdmin,
    wrapAsync(listingController.deleteListing)
  );


// Edit Route
router.route("/:id/edit")
  .get(
    isOwnerOrAdmin,
    wrapAsync(listingController.renderEditForm)
  );


module.exports = router;
