const passport = require("passport");
const User = require("../models/user");
const crypto = require("crypto");
const { sendPasswordResetEmail } = require("../config/emailConfig");


module.exports.signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  const newUser = new User({ email, username });
  const registeredUser = await User.register(newUser, password);

  req.login(registeredUser, (err) => {
    if (err) return next(err);

    req.flash("success", "Welcome to Wanderlust!");
    res.redirect("/listings");
  });
};



module.exports.rendersignUpForm = (req, res) => {
  // If already logged in, redirect to listings
  if (req.isAuthenticated()) {
    req.flash("error", "You are already logged in!");
    return res.redirect("/listings");
  }
  res.render("users/signup");
};



module.exports.renderLoginForm = (req, res) => {
  // If already logged in, redirect to listings
  if (req.isAuthenticated()) {
    req.flash("error", "You are already logged in!");
    return res.redirect("/listings");
  }
  res.render("users/login");
};


module.exports.renderAdminLoginForm = (req, res) => {
  // If already logged in, redirect to listings
  if (req.isAuthenticated()) {
    req.flash("error", "You are already logged in!");
    return res.redirect("/listings");
  }
  res.render("users/adminLogin");
};


module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!");

  const redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};


module.exports.adminLogin = (req, res) => {
  // Check if user is actually an admin
  if (req.user.role !== "admin") {
    req.flash("error", "Access denied! Admin privileges required.");
    return res.redirect("/login");
  }

  req.flash("success", "Welcome back, Admin!");
  const redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};


module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);

    req.flash("success", "Logged out successfully!");
    res.redirect("/");
  });
};

// Profile Page
module.exports.renderProfile = (req, res) => {
  res.render("users/profile");
};

// Settings Page
module.exports.renderSettings = (req, res) => {
  res.render("users/settings");
};


// Forgot Password - Render Form
module.exports.renderForgotPassword = (req, res) => {
  res.render("users/forgotPassword");
};

// Forgot Password - Send Reset Email
module.exports.sendResetEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      req.flash("error", "No account found with that email address.");
      return res.redirect("/forgot-password");
    }

    // Generate 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = verificationCode;
    user.verificationCodeExpires = Date.now() + 900000; // 15 minutes
    await user.save();

    // Send email - will throw error if it fails
    await sendPasswordResetEmail(email, verificationCode, user.username);
    
    req.flash("success", "Verification code sent to your email!");
    res.redirect(`/verify-code?email=${encodeURIComponent(email)}`);
  } catch (err) {
    console.error("Error sending password reset email:", err);
    req.flash("error", "Failed to send verification email. Please check your email configuration or try again later.");
    res.redirect("/forgot-password");
  }
};

// Reset Password - Render Form
module.exports.renderResetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      req.flash("error", "Password reset token is invalid or has expired.");
      return res.redirect("/forgot-password");
    }

    res.render("users/resetPassword", { token });
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong!");
    res.redirect("/forgot-password");
  }
};

// Verify Code - Render Form
module.exports.renderVerifyCode = (req, res) => {
  const email = req.query.email;
  if (!email) {
    req.flash("error", "Email is required.");
    return res.redirect("/forgot-password");
  }
  res.render("users/verifyCode", { email });
};

// Verify Code - Check Code
module.exports.verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({
      email,
      verificationCode: code,
      verificationCodeExpires: { $gt: Date.now() }
    });

    if (!user) {
      req.flash("error", "Invalid or expired verification code.");
      return res.redirect(`/verify-code?email=${encodeURIComponent(email)}`);
    }

    // Code is valid, redirect to reset password
    res.redirect(`/reset-password-form?email=${encodeURIComponent(email)}&code=${code}`);
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong!");
    res.redirect("/forgot-password");
  }
};

// Reset Password Form - Render
module.exports.renderResetPasswordForm = async (req, res) => {
  const { email, code } = req.query;
  if (!email || !code) {
    req.flash("error", "Invalid request.");
    return res.redirect("/forgot-password");
  }

  // Verify code is still valid
  const user = await User.findOne({
    email,
    verificationCode: code,
    verificationCodeExpires: { $gt: Date.now() }
  });

  if (!user) {
    req.flash("error", "Verification code has expired.");
    return res.redirect("/forgot-password");
  }

  res.render("users/resetPasswordForm", { email, code });
};

// Reset Password - Update Password
module.exports.resetPassword = async (req, res) => {
  try {
    const { email, code, password } = req.body;

    const user = await User.findOne({
      email,
      verificationCode: code,
      verificationCodeExpires: { $gt: Date.now() }
    });

    if (!user) {
      req.flash("error", "Invalid or expired verification code.");
      return res.redirect("/forgot-password");
    }

    // Reset password using passport-local-mongoose
    await user.setPassword(password);
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();

    req.flash("success", "Password reset successful! Please login with your new password.");
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    req.flash("error", "Could not reset password. Please try again.");
    res.redirect("/forgot-password");
  }
};
