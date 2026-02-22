const nodemailer = require("nodemailer");

// Create transporter
const createTransporter = () => {
  // For development, use ethereal email (fake SMTP)
  // For production, use real SMTP like Gmail, SendGrid, etc.
  
  if (process.env.NODE_ENV === "production") {
    // Production email config
    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  } else {
    // Development: Use Ethereal (fake SMTP for testing)
    // Or configure with your test email
    return nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER || "your-email@gmail.com",
        pass: process.env.EMAIL_PASSWORD || "your-app-password"
      }
    });
  }
};

// Send password reset email with verification code
const sendPasswordResetEmail = async (email, verificationCode, username) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_USER || "WanderLust <noreply@wanderlust.com>",
    to: email,
    subject: "Password Reset Verification Code - WanderLust",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #667eea;">Password Reset Request</h2>
        <p>Hello ${username},</p>
        <p>You requested to reset your password for your WanderLust account.</p>
        <p>Use the verification code below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; display: inline-block;">
            <h1 style="color: #667eea; margin: 0; font-size: 3rem; letter-spacing: 8px;">
              ${verificationCode}
            </h1>
          </div>
        </div>
        <p style="text-align: center; color: #666;">Enter this code on the password reset page</p>
        <p><strong>This code will expire in 15 minutes.</strong></p>
        <p>If you didn't request this, please ignore this email.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #999; font-size: 12px;">
          This is an automated email from WanderLust. Please do not reply.
        </p>
      </div>
    `
  };
  
  // Send email - throw error if it fails
  await transporter.sendMail(mailOptions);
  return { success: true };
};

// Send booking confirmation email
const sendBookingConfirmation = async (email, bookingDetails) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_USER || "WanderLust <noreply@wanderlust.com>",
    to: email,
    subject: "Booking Confirmation - WanderLust",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #667eea;">Booking Confirmed!</h2>
        <p>Hello ${bookingDetails.username},</p>
        <p>Your booking has been confirmed!</p>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="margin-top: 0;">${bookingDetails.listingTitle}</h3>
          <p><strong>Check-in:</strong> ${bookingDetails.checkIn}</p>
          <p><strong>Check-out:</strong> ${bookingDetails.checkOut}</p>
          <p><strong>Guests:</strong> ${bookingDetails.guests}</p>
          <p><strong>Total Price:</strong> ₹${bookingDetails.totalPrice.toLocaleString("en-IN")}</p>
        </div>
        <p>We look forward to hosting you!</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #999; font-size: 12px;">
          This is an automated email from WanderLust. Please do not reply.
        </p>
      </div>
    `
  };
  
  // Send email - throw error if it fails
  await transporter.sendMail(mailOptions);
  return { success: true };
};

module.exports = {
  sendPasswordResetEmail,
  sendBookingConfirmation
};
