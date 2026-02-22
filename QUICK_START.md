# Quick Start Guide - WanderLust

## 🚀 Start the Application

```bash
# Navigate to backend folder
cd backend

# Install dependencies (first time only)
npm install

# Start the server
npm start

# Or with auto-reload during development
npm run dev
```

Server will run on: **http://localhost:8080**

---

## 📦 Initial Setup (First Time Only)

### 1. Seed Database with Sample Listings
```bash
cd backend
npm run seed
```
This adds 20 sample listings with categories.

### 2. Create Admin User
```bash
npm run create-admin
```
Default admin credentials:
- Username: `admin`
- Password: `admin123`

---

## 🔑 Login Options

### Regular User Login
- Go to: http://localhost:8080/login
- Or signup: http://localhost:8080/signup

### Admin Login
- Go to: http://localhost:8080/admin/login
- Use admin credentials created above

---

## ✨ Test New Features

### 1. Password Reset
1. Go to login page
2. Click "Forgot Password?"
3. Enter email address
4. Check console logs for reset link (if email not configured)

### 2. Book a Listing
1. Login as regular user
2. Browse listings
3. Click on any listing
4. Fill booking form (check-in, check-out, guests)
5. Click "Book Now"
6. View your bookings: Click "My Bookings" in navbar

### 3. Admin Dashboard
1. Login as admin
2. Click "Dashboard" button in navbar
3. View analytics, revenue, and booking stats

---

## 📧 Enable Email (Optional)

To send real emails for password reset and booking confirmations:

1. Edit `backend/.env`
2. Update these values:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
NODE_ENV=development
```

3. Get Gmail App Password:
   - Go to: https://myaccount.google.com/apppasswords
   - Generate new app password
   - Use that password in `.env`

---

## 🎯 Key URLs

- **Landing Page**: http://localhost:8080/
- **Listings**: http://localhost:8080/listings
- **Login**: http://localhost:8080/login
- **Admin Login**: http://localhost:8080/admin/login
- **My Bookings**: http://localhost:8080/bookings/my-bookings
- **Admin Dashboard**: http://localhost:8080/admin/dashboard
- **All Bookings (Admin)**: http://localhost:8080/admin/bookings

---

## 🛠️ Useful Commands

```bash
# Check listings in database
npm run check-listings

# List all users
npm run list-users

# Make existing user an admin
npm run make-admin

# Reseed database (deletes existing data)
npm run seed
```

---

## 📚 Documentation

- **Admin Guide**: See `ADMIN_GUIDE.md`
- **Features Guide**: See `FEATURES_GUIDE.md`
- **Airbnb Features**: See `AIRBNB_FEATURES_GUIDE.md`
- **Login System**: See `LOGIN_SYSTEM_GUIDE.md`

---

## ✅ Quick Test Checklist

- [ ] Server starts without errors
- [ ] Can access landing page
- [ ] Can signup as new user
- [ ] Can login as regular user
- [ ] Can view listings
- [ ] Can book a listing
- [ ] Can view "My Bookings"
- [ ] Can login as admin
- [ ] Can access admin dashboard
- [ ] Can add new listing (admin only)
- [ ] Can view all bookings (admin only)

---

## 🐛 Common Issues

### Port Already in Use
```bash
# Kill process on port 8080
# Windows:
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `app.js`

### Module Not Found
```bash
# Install dependencies
npm install
```

---

That's it! You're ready to explore WanderLust! 🎉
