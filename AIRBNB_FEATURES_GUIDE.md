# Airbnb-like Features Guide

This guide covers the new features added to WanderLust: Password Reset, Bookings, and Admin Analytics.

## 🔐 Password Reset Feature

### How It Works
1. User clicks "Forgot Password?" on the login page
2. Enters their email address
3. Receives a password reset link via email (valid for 1 hour)
4. Clicks the link and enters a new password
5. Can now login with the new password

### Routes
- `GET /forgot-password` - Show forgot password form
- `POST /forgot-password` - Send reset email
- `GET /reset-password/:token` - Show reset password form
- `POST /reset-password/:token` - Update password

### Email Configuration
To enable email functionality, update `backend/.env`:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
NODE_ENV=development
```

**For Gmail:**
1. Go to https://myaccount.google.com/apppasswords
2. Generate an App Password
3. Use that password (not your regular Gmail password)

---

## 📅 Booking System

### User Features

#### Book a Listing
1. Login as a regular user (not admin)
2. View any listing
3. Fill in the booking form:
   - Check-in date
   - Check-out date
   - Number of guests
4. Click "Book Now"
5. System checks availability
6. If available, booking is confirmed and email is sent

#### View My Bookings
- Click "My Bookings" in the navbar
- See all your bookings with status badges
- Cancel upcoming bookings

#### Booking Statuses
- **Confirmed** - Booking is active
- **Cancelled** - User cancelled the booking
- **Completed** - Check-out date has passed
- **Pending** - Awaiting confirmation

### Admin Features
- Admins cannot book listings (they manage them)
- Admins can view all bookings at `/admin/bookings`

### Routes
- `POST /listings/:id/book` - Create a booking
- `GET /bookings/my-bookings` - View user's bookings
- `POST /bookings/:id/cancel` - Cancel a booking
- `GET /admin/bookings` - Admin view all bookings

### Availability Check
The system automatically checks if dates are available:
- Prevents double bookings
- Validates check-in is before check-out
- Ensures check-in is not in the past

---

## 📊 Admin Analytics Dashboard

### Access
- Login as admin
- Click "Dashboard" button in navbar
- Or visit `/admin/dashboard`

### Dashboard Features

#### Overview Stats (4 Cards)
1. **Total Listings** - Number of properties
2. **Total Users** - Number of registered users
3. **Total Bookings** - All bookings count
4. **Total Revenue** - Sum of confirmed/completed bookings

#### Bookings by Status
- Visual breakdown of bookings by status
- Shows count for each status type

#### Monthly Revenue
- Last 6 months revenue data
- Shows booking count and revenue per month

#### Top 5 Listings
- Most booked properties
- Shows booking count and revenue per listing

#### Recent Bookings
- Last 10 bookings across all users
- Quick overview of recent activity

### Routes
- `GET /admin/dashboard` - Admin analytics dashboard
- `GET /admin/bookings` - All bookings table view

---

## 🚀 Testing the Features

### 1. Test Password Reset

**Without Email Setup:**
- The feature will work but emails won't be sent
- Check console logs for the reset link

**With Email Setup:**
1. Configure `.env` with your Gmail credentials
2. Go to `/forgot-password`
3. Enter your email
4. Check your inbox for reset link
5. Click link and set new password

### 2. Test Bookings

**Create a Booking:**
```bash
# 1. Start the server
cd backend
npm start

# 2. Login as regular user (not admin)
# 3. Visit any listing
# 4. Fill booking form and submit
```

**View Bookings:**
- User: Click "My Bookings" in navbar
- Admin: Click "Dashboard" or visit `/admin/bookings`

**Cancel a Booking:**
- Go to "My Bookings"
- Click "Cancel Booking" on any confirmed future booking

### 3. Test Admin Dashboard

```bash
# 1. Login as admin
# Username: admin
# Password: admin123

# 2. Click "Dashboard" button in navbar
# 3. Explore analytics and stats
```

---

## 📁 New Files Created

### Controllers
- `backend/controllers/analytics.js` - Admin dashboard logic

### Routes
- `backend/routes/booking.js` - Booking routes
- `backend/routes/admin.js` - Admin routes

### Views
- `frontend/views/users/forgotPassword.ejs` - Forgot password form
- `frontend/views/users/resetPassword.ejs` - Reset password form
- `frontend/views/bookings/myBookings.ejs` - User bookings page
- `frontend/views/bookings/allBookings.ejs` - Admin all bookings
- `frontend/views/admin/dashboard.ejs` - Admin analytics dashboard

### Config
- `backend/config/emailConfig.js` - Email configuration (already existed)

### Models
- `backend/models/booking.js` - Booking schema (already existed)

---

## 🔧 Updated Files

### Controllers
- `backend/controllers/users.js` - Added password reset functions

### Routes
- `backend/routes/user.js` - Added password reset routes

### Views
- `frontend/views/users/login.ejs` - Added "Forgot Password?" link
- `frontend/views/listings/show.ejs` - Added booking form
- `frontend/views/includes/navbar.ejs` - Added "My Bookings" and "Dashboard" links

### Config
- `backend/app.js` - Added booking and admin routes
- `backend/.env` - Added email configuration

---

## 🎯 Quick Commands

```bash
# Start server
cd backend
npm start

# Or with auto-reload
npm run dev

# Create admin user
npm run create-admin

# Seed database with sample listings
npm run seed

# Check listings in database
npm run check-listings
```

---

## 📝 Notes

1. **Email Feature**: Emails will only work if you configure Gmail App Password in `.env`
2. **Booking Validation**: System prevents overlapping bookings automatically
3. **Admin vs User**: Admins manage listings, users book them
4. **Revenue Calculation**: Only confirmed and completed bookings count toward revenue
5. **Date Validation**: Check-in must be before check-out and not in the past

---

## 🐛 Troubleshooting

### Email Not Sending
- Check `.env` configuration
- Verify Gmail App Password is correct
- Check console logs for error messages

### Booking Not Working
- Ensure user is logged in
- Check if dates are available
- Verify listing exists

### Dashboard Not Loading
- Ensure logged in as admin
- Check MongoDB connection
- Verify all models are properly imported

---

## ✅ Feature Checklist

- [x] Password reset with email
- [x] Forgot password form
- [x] Reset password form
- [x] Booking system with availability check
- [x] My Bookings page for users
- [x] Cancel booking functionality
- [x] Admin view all bookings
- [x] Admin analytics dashboard
- [x] Revenue tracking
- [x] Top listings by bookings
- [x] Monthly revenue chart
- [x] Email notifications for bookings
- [x] Email notifications for password reset

All features are now complete and ready to use!
