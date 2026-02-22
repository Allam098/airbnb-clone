# Login System Guide

## Overview

WanderLust now has a dual login system with separate portals for regular users and administrators.

## 🏠 Landing Page

**URL**: `http://localhost:8080/`

**Features**:
- First page users see when visiting the website
- Beautiful hero section with call-to-action
- Shows "Sign Up" and "Login" buttons for non-authenticated users
- Shows "Explore Listings" button for authenticated users
- Feature showcase and statistics

## 👤 User Login

**URL**: `http://localhost:8080/login`

**Features**:
- Standard login for regular users
- Link to admin login portal at the bottom
- Redirects to `/listings` after successful login
- Flash messages for errors

**How to Use**:
1. Go to `http://localhost:8080/login`
2. Enter username and password
3. Click "Login"
4. Redirected to listings page

## 🛡️ Admin Login

**URL**: `http://localhost:8080/admin/login`

**Features**:
- Dedicated admin portal with secure design
- Blue gradient theme (different from user login)
- Shield icon indicating admin access
- Security badge showing activities are logged
- Link back to user login
- Validates admin role after authentication

**How to Use**:
1. Go to `http://localhost:8080/admin/login`
2. Enter admin username and password
3. Click "Login as Admin"
4. System checks if user has admin role
5. If admin: Redirected to listings with admin privileges
6. If not admin: Redirected back with error message

**Security**:
- Even if a regular user tries to login via admin portal, they will be denied
- Admin role is verified server-side after authentication
- All admin activities can be logged (future enhancement)

## 🔐 Authentication Flow

### For Regular Users:
```
Landing Page (/) 
  → Click "Login" 
  → User Login (/login) 
  → Enter credentials 
  → Listings Page (/listings)
```

### For Admins:
```
Landing Page (/) 
  → Click "Login" 
  → User Login (/login) 
  → Click "Admin Login" link 
  → Admin Login (/admin/login) 
  → Enter admin credentials 
  → System verifies admin role 
  → Listings Page with admin privileges
```

## 🎨 Visual Differences

### User Login Page:
- Standard Bootstrap styling
- Simple form layout
- Uses main site theme
- Part of boilerplate layout

### Admin Login Page:
- Standalone page (no navbar/footer)
- Blue gradient background (#1e3c72 to #2a5298)
- Shield icon and "Admin Portal" branding
- Security badge
- Animated elements
- Professional admin theme

## 🚀 Quick Start

### Create Your First Admin:

1. **Sign up as a regular user**:
   ```
   http://localhost:8080/signup
   ```

2. **Make yourself admin**:
   ```bash
   cd backend
   npm run create-admin
   # OR
   npm run make-admin your_username
   ```

3. **Login via admin portal**:
   ```
   http://localhost:8080/admin/login
   ```

## 📋 Routes Summary

| Route | Purpose | Access |
|-------|---------|--------|
| `/` | Landing page | Public |
| `/signup` | User registration | Public |
| `/login` | User login | Public |
| `/admin/login` | Admin login | Public (but validates admin role) |
| `/listings` | Browse listings | Authenticated users |
| `/listings/new` | Add listing | Admin only |
| `/listings/:id/edit` | Edit listing | Admin only |
| `/logout` | Logout | Authenticated users |

## 🔒 Security Features

1. **Role-Based Access Control**:
   - Regular users can browse and review
   - Admins can add/edit/delete listings

2. **Admin Verification**:
   - Admin login checks role after authentication
   - Non-admins are denied even with valid credentials

3. **Session Management**:
   - Secure session cookies
   - 7-day session expiry
   - HTTP-only cookies

4. **Flash Messages**:
   - Success/error feedback
   - User-friendly error messages

## 🎯 User Experience

### First-Time Visitor:
1. Sees landing page with signup/login options
2. Cannot access listings without authentication
3. Must create account or login

### Regular User:
1. Logs in via user login page
2. Can browse all listings
3. Can leave reviews
4. Cannot add/edit/delete listings
5. Sees "Hello, username!" in navbar

### Admin User:
1. Logs in via admin login page
2. Sees "Admin" badge in navbar
3. Can browse all listings
4. Can add new listings
5. Can edit any listing
6. Can delete any listing
7. Sees "Add Listing" button

## 🛠️ Customization

### Change Admin Theme Colors:
Edit `frontend/views/users/adminLogin.ejs`:
```css
background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
```

### Change Landing Page:
Edit `frontend/views/landing.ejs`

### Modify Login Behavior:
Edit `backend/controllers/users.js`:
- `login()` - Regular user login
- `adminLogin()` - Admin login with role check

## 🐛 Troubleshooting

### "Access denied! Admin privileges required"
- You're trying to login via admin portal without admin role
- Solution: Use `npm run make-admin your_username`

### Can't access listings page
- You're not logged in
- Solution: Login via `/login` or `/admin/login`

### Admin login redirects to user login
- Check if user has admin role in database
- Run: `npm run list-users` to verify

### Landing page not showing
- Clear browser cache
- Check if server is running
- Verify route in `backend/app.js`

## 📱 Mobile Responsive

Both login pages are fully responsive:
- Desktop: Full-width forms with side padding
- Tablet: Centered forms with max-width
- Mobile: Full-width forms optimized for touch

## 🔮 Future Enhancements

Consider adding:
1. **Password Reset**: Email-based password recovery
2. **Two-Factor Authentication**: Extra security for admins
3. **Activity Logs**: Track admin actions
4. **Multiple Admin Levels**: Super admin, moderator, etc.
5. **Social Login**: Google, Facebook authentication
6. **Remember Me**: Persistent login option
7. **Account Verification**: Email verification for new users
8. **Admin Dashboard**: Dedicated admin panel with statistics

## ✅ Testing Checklist

- [ ] Landing page loads correctly
- [ ] User login works
- [ ] Admin login works
- [ ] Admin role is verified
- [ ] Non-admin cannot access admin features
- [ ] Flash messages display correctly
- [ ] Logout works
- [ ] Redirects work properly
- [ ] Mobile responsive
- [ ] Admin badge shows in navbar
- [ ] "Add Listing" button shows for admin only

## 📚 Related Files

- `frontend/views/landing.ejs` - Landing page
- `frontend/views/users/login.ejs` - User login
- `frontend/views/users/adminLogin.ejs` - Admin login
- `backend/routes/user.js` - Authentication routes
- `backend/controllers/users.js` - Login controllers
- `backend/middleware/middleware.js` - Auth middleware
