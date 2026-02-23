// Load environment variables first
require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const express = require("express");
const app = express();
const helmet = require("helmet");
const mongoose = require("mongoose");
const path = require("path");
const ExpressError = require("./utils/ExpressError.js");
const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");
const bookingRouter=require("./routes/booking.js");
const adminRouter=require("./routes/admin.js");

// Trust proxy for Render/production
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Security middleware - Helmet with custom configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://cdnjs.cloudflare.com", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      connectSrc: ["'self'"],
      frameSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null,
    },
  },
  crossOriginEmbedderPolicy: false,
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views"));
app.use(express.urlencoded({ extended: true }));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const engine = require("ejs-mate");
app.engine("ejs", engine);
app.use(express.static(path.join(__dirname, "../frontend/public")));
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User=require("./models/user.js");
const multer=require("multer");
const upload=multer({dest : path.join(__dirname, '../uploads/')});



const sessionOptions = {
  secret: process.env.SESSION_SECRET || "mysupersecretcode",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: 'lax'
  }
};


const connectDB = async () => {
  try {
    const dbUrl = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/wanderlust";
    console.log("🔗 Connecting to MongoDB...");
    console.log("📍 Database URL:", dbUrl.includes('mongodb+srv') ? 'MongoDB Atlas' : 'Local MongoDB');
    await mongoose.connect(dbUrl);
    console.log("MongoDB connected successfully ✅");
  } catch (error) {
    console.error("MongoDB connection failed ❌", error);
    process.exit(1);
  }
};

connectDB();

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  res.locals.search = req.query.search || "";
  res.locals.minPrice = req.query.minPrice || "";
  res.locals.maxPrice = req.query.maxPrice || "";
  res.locals.category = req.query.category || "";
  next();
});

// Test route (FIRST - for debugging)
app.get("/test", (req, res) => {
  res.send("Test route works!");
});

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`REQUEST: ${req.method} ${req.path}`);
  next();
});

// Landing page route (MUST be first)
app.get("/", async (req, res) => {
  try {
    // Fetch some listings to show in background
    const Listing = require("./models/listing");
    const sampleListings = await Listing.find({}).limit(12).lean();
    res.render("landing", { sampleListings });
  } catch (err) {
    console.error(err);
    res.render("landing", { sampleListings: [] });
  }
});

//express routes
app.use("/",userRouter);
app.use("/", bookingRouter);
app.use("/", adminRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/listings", listingRouter);

// 404 route (must be absolute last)
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});


// error middleware 
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error",{message});
});


app.listen(8080, () => {
  console.log("server is listening to the port 8080");
  console.log("Environment:", process.env.NODE_ENV || 'development');
});
