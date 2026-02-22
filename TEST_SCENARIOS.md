# Test Scenarios for Login System

## ✅ Fixed Issue: Logged-in Users Can't Access Login/Signup Pages

### Problem:
When a user was already logged in and tried to visit `/login` or `/signup`, they would see the login/signup page with login/signup links in the navbar, which was confusing.

### Solution:
Added authentication checks in the controller functions that redirect logged-in users to the listings page.

## 🧪 Test Scenarios

### Scenario 1: Guest User Visits Login Page
**Steps:**
1. Open browser in incognito/private mode
2. Go to `http://localhost:8080/login`

**Expected Result:**
- ✅ Login page displays
- ✅ Navbar shows "SignUp" and "Login" links
- ✅ Can enter credentials and login

### Scenario 2: Logged-in User Tries to Visit Login Page
**Steps:**
1. Login as a user
2. Try to visit `http://localhost:8080/login`

**Expected Result:**
- ✅ Automatically redirected to `/listings`
- ✅ Flash message: "You are already logged in!"
- ✅ Navbar shows "Hello, username!" and "Logout"

### Scenario 3: Logged-in User Tries to Visit Signup Page
**Steps:**
1. Login as a user
2. Try to visit `http://localhost:8080/signup`

**Expected Result:**
- ✅ Automatically redirected to `/listings`
- ✅ Flash message: "You are already logged in!"
- ✅ Navbar shows "Hello, username!" and "Logout"

### Scenario 4: Logged-in User Tries to Visit Admin Login
**Steps:**
1. Login as a regular user
2. Try to visit `http://localhost:8080/admin/login`

**Expected Result:**
- ✅ Automatically redirected to `/listings`
- ✅ Flash message: "You are already logged in!"
- ✅ Navbar shows "Hello, username!" and "Logout"

### Scenario 5: Admin User Tries to Visit Login Page
**Steps:**
1. Login as an admin
2. Try to visit `http://localhost:8080/login`

**Expected Result:**
- ✅ Automatically redirected to `/listings`
- ✅ Flash message: "You are already logged in!"
- ✅ Navbar shows "Admin" badge, "Hello, username!" and "Logout"
- ✅ "Add Listing" button visible

### Scenario 6: User Logs Out and Visits Login
**Steps:**
1. Login as a user
2. Click "Logout"
3. Visit `http://localhost:8080/login`

**Expected Result:**
- ✅ Login page displays
- ✅ Navbar shows "SignUp" and "Login" links
- ✅ Can login again

## 🔍 Additional Edge Cases

### Edge Case 1: Direct URL Access While Logged In
**Test:**
- Login as user
- Type `/login` in address bar
- Press Enter

**Expected:**
- Redirected to `/listings` with flash message

### Edge Case 2: Browser Back Button After Login
**Test:**
1. Visit `/login` page
2. Login successfully
3. Press browser back button

**Expected:**
- Redirected to `/listings` (not showing login page)

### Edge Case 3: Multiple Tabs
**Test:**
1. Open two tabs
2. Login in Tab 1
3. Try to access `/login` in Tab 2

**Expected:**
- Tab 2 redirects to `/listings`

## 📋 Quick Test Checklist

Run through these quickly:

- [ ] Guest can access `/login`
- [ ] Guest can access `/signup`
- [ ] Guest can access `/admin/login`
- [ ] Logged-in user CANNOT access `/login` (redirects)
- [ ] Logged-in user CANNOT access `/signup` (redirects)
- [ ] Logged-in user CANNOT access `/admin/login` (redirects)
- [ ] Flash message shows when redirected
- [ ] Navbar shows correct links for guest
- [ ] Navbar shows correct links for logged-in user
- [ ] Navbar shows admin badge for admin
- [ ] Logout works correctly
- [ ] After logout, can access login pages again

## 🎯 User Experience Flow

### For New Users:
```
Landing Page → Click "Sign Up" → Fill Form → Auto Login → Listings Page
```

### For Returning Users:
```
Landing Page → Click "Login" → Enter Credentials → Listings Page
```

### For Admins:
```
Landing Page → Click "Login" → Click "Admin Login" → Enter Credentials → Verify Admin Role → Listings Page with Admin Features
```

### For Logged-in Users Trying to Login Again:
```
Any Page → Try to visit /login → Redirected to /listings → Flash Message
```

## 🐛 Common Issues to Watch For

1. **Session Not Persisting**
   - Check if cookies are enabled
   - Verify session secret is set
   - Check session expiry time

2. **Redirect Loop**
   - Ensure middleware order is correct
   - Check if `req.isAuthenticated()` works properly

3. **Flash Messages Not Showing**
   - Verify flash middleware is loaded
   - Check if flash.ejs is included in layout

4. **Navbar Not Updating**
   - Clear browser cache
   - Check if `currUser` is set in middleware
   - Verify EJS conditionals are correct

## ✨ Benefits of This Fix

1. **Better UX**: Users don't see confusing login links when already logged in
2. **Security**: Prevents unnecessary access to auth pages
3. **Clear Feedback**: Flash messages inform users why they were redirected
4. **Consistent State**: Navbar always reflects current authentication state
5. **Prevents Confusion**: Users can't accidentally try to login twice

## 🔄 Related Files Modified

- `backend/controllers/users.js` - Added authentication checks
- All views already had proper `currUser` checks in navbar

## 📝 Notes

- The fix uses `req.isAuthenticated()` which is provided by Passport.js
- Flash messages provide user feedback
- Redirect happens before rendering the view, so no page flash
- Works for all three auth pages: login, signup, and admin login
