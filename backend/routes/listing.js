const express = require("express");
const router = express.Router();
const multer = require("multer");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isAdmin, validateListing } = require("../middleware/middleware.js");
const listingController = require("../controllers/listings.js");
const { storage } = require("../config/cloudConfig.js");
const upload = multer({ storage });



// Index Route & Create Route
router.route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isAdmin,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// New Route
router.route("/new")
  .get(isAdmin, listingController.renderNewForm);


// Show, Update & Delete Routes
router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isAdmin,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isAdmin,
    wrapAsync(listingController.deleteListing)
  );


// Edit Route
router.route("/:id/edit")
  .get(
    isAdmin,
    wrapAsync(listingController.renderEditForm)
  );


module.exports = router;
