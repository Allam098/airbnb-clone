const Listing = require("../models/listing");
const Review = require("../models/review");
const ExpressError = require("../utils/ExpressError");
const { listingSchema, reviewSchema } = require("./schema");

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    if (req.method === "POST") {
      req.session.redirectUrl = req.headers.referer;
    } else {
      req.session.redirectUrl = req.originalUrl;
    }
    req.flash("error", "You must be logged in!");
    return res.redirect("/login");
  }
  next();
};

const savedRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
    delete req.session.redirectUrl;
  }
  next();
};

const isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "You do not have permission.");
    return res.redirect("/listings/" + id);
  }
  next();
};

const isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review) {
    req.flash("error", "Review not found!");
    return res.redirect("/listings/" + id);
  }
  if (!review.author || !review.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission.");
    return res.redirect("/listings/" + id);
  }
  next();
};

const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const message = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, message);
  }
  next();
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const message = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, message);
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in!");
    return res.redirect("/login");
  }
  if (req.user.role !== "admin") {
    req.flash("error", "You do not have admin privileges!");
    return res.redirect("/listings");
  }
  next();
};

module.exports = {
  isLoggedIn,
  savedRedirectUrl,
  isOwner,
  isReviewAuthor,
  validateListing,
  validateReview,
  isAdmin
};
