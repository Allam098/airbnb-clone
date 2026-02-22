const express = require("express");
const router = express.Router();
const passport = require("passport");

const wrapAsync = require("../utils/wrapAsync");
const { savedRedirectUrl } = require("../middleware/middleware");
const userController = require("../controllers/users");


// Signup Route
router.route("/signup")
  .get(userController.rendersignUpForm)
  .post(wrapAsync(userController.signUp));


// Login Route
router.route("/login")
  .get(userController.renderLoginForm)
  .post(
    savedRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true
    }),
    userController.login
  );


// Admin Login Routes
router.route("/admin/login")
  .get(userController.renderAdminLoginForm)
  .post(
    savedRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/admin/login",
      failureFlash: true
    }),
    userController.adminLogin
  );


// Logout Route
router.route("/logout")
  .get(userController.logout);

// Profile Route
router.route("/profile")
  .get(userController.renderProfile);

// Settings Route
router.route("/settings")
  .get(userController.renderSettings);


// Forgot Password Routes
router.route("/forgot-password")
  .get(userController.renderForgotPassword)
  .post(wrapAsync(userController.sendResetEmail));

// Verify Code Routes
router.route("/verify-code")
  .get(userController.renderVerifyCode)
  .post(wrapAsync(userController.verifyCode));

// Reset Password Form Routes
router.route("/reset-password-form")
  .get(wrapAsync(userController.renderResetPasswordForm));

// Reset Password Routes
router.route("/reset-password")
  .post(wrapAsync(userController.resetPassword));

// Old token-based route (keep for backwards compatibility)
router.route("/reset-password/:token")
  .get(wrapAsync(userController.renderResetPassword));


module.exports = router;
