const Listing = require("../models/listing");
const mongoose = require("mongoose");


//create listing
module.exports.createListing = async (req, res, next) => {
  try {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;

    // Image upload
    if (req.file) {
      newListing.image = {
        url: req.file.path,
        filename: req.file.filename
      };
    }

    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect(`/listings/${newListing._id}`);
  } catch (err) {
    next(err);
  }
};



   //INDEX (Search + Category + Show All)

module.exports.index = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice } = req.query;

    let filter = {};

    // SEARCH
    if (search && search.trim() !== "") {
      filter.$or = [
        { title: { $regex: search.trim(), $options: "i" } },
        { location: { $regex: search.trim(), $options: "i" } },
        { country: { $regex: search.trim(), $options: "i" } }
      ];
    }

    // CATEGORY FILTER
    if (category && category !== "All") {
      filter.category = category;
    }

    // PRICE FILTER
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    const allListings = await Listing.find(filter).lean();

    res.render("listings/index", {
      allListings,
      category,
      search,
      minPrice,
      maxPrice
    });

  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong!");
    res.redirect("/listings");
  }
};


//new form
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};


//show listing
module.exports.showListing = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash("error", "Invalid Listing ID!");
      return res.redirect("/listings");
    }

    const listing = await Listing.findById(id)
      .populate("owner")
      .populate({
        path: "reviews",
        populate: { path: "author" }
      });

    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    res.render("listings/show", { listing });

  } catch (err) {
    next(err);
  }
};


//edit form
module.exports.renderEditForm = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash("error", "Invalid Listing ID!");
      return res.redirect("/listings");
    }

    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    const blurredImageUrl = listing.image?.url
      ? listing.image.url.replace("/upload", "/upload/w_300,e_blur:250")
      : null;

    res.render("listings/edit", { listing, blurredImageUrl });

  } catch (err) {
    next(err);
  }
};


//update listing
module.exports.updateListing = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash("error", "Invalid Listing ID!");
      return res.redirect("/listings");
    }

    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    // Update fields
    Object.assign(listing, req.body.listing);

    // Update image if new one uploaded
    if (req.file) {
      listing.image = {
        url: req.file.path,
        filename: req.file.filename
      };
    }

    await listing.save();

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);

  } catch (err) {
    next(err);
  }
};



  // DELETE LISTING

module.exports.deleteListing = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash("error", "Invalid Listing ID!");
      return res.redirect("/listings");
    }

    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");

  } catch (err) {
    next(err);
  }
};