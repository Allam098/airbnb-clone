# Admin System Guide

## Overview

The WanderLust application now has a role-based access control system with two roles:
- **User**: Can browse listings, leave reviews, and book properties
- **Admin**: Can add, edit, and delete listings (full control)

## User Roles

### Regular User
- Browse all listings
- Search and filter listings
- View listing details
- Leave reviews (when logged in)
- Edit/delete their own reviews

### Admin
- All user permissions
- Add new listings
- Edit any listing
- Delete any listing
- See "Add Listing" button in navbar

## How to Make a User Admin

### Method 1: Using the Script (Recommended)

1. First, create a user account by signing up on the website
2. Navigate to the backend folder:
   ```bash
   cd backend
   ```

3. Run the make-admin script with the username:
   ```bash
   npm run make-admin <username>
   ```
   
   Example:
   ```bash
   npm run make-admin john_doe
   ```

4. You should see: `✅ User "john_doe" is now an admin!`

### Method 2: Using MongoDB Directly

1. Open MongoDB shell:
   ```bash
   mongosh
   ```

2. Switch to your database:
   ```javascript
   use wanderlust
   ```

3. Update the user:
   ```javascript
   db.users.updateOne(
     { username: "john_doe" },
     { $set: { role: "admin" } }
   )
   ```

### Method 3: During Signup (Manual Database Edit)

After a user signs up, you can manually update their role in MongoDB Compass or any MongoDB GUI tool:
- Find the user in the `users` collection
- Change the `role` field from `"user"` to `"admin"`

## Listing All Users

To see all users and their roles:

```bash
cd backend
npm run list-users
```

This will display a table with:
- Username
- Email
- Role

## Admin Features

### What Admins Can Do:

1. **Add New Listings**
   - Click "Add Listing" button in navbar
   - Fill in listing details
   - Upload images
   - Set category and price

2. **Edit Listings**
   - Visit any listing page
   - Click "Edit" button (only visible to admins)
   - Modify listing details
   - Update images

3. **Delete Listings**
   - Visit any listing page
   - Click "Delete" button (only visible to admins)
   - Listing is permanently removed

### What Regular Users CANNOT Do:

- Access `/listings/new` route (redirected with error)
- See Edit/Delete buttons on listings
- Modify or delete any listings
- Access admin-only routes

## Security Features

1. **Route Protection**: All admin routes are protected with `isAdmin` middleware
2. **UI Hiding**: Admin buttons are hidden from regular users
3. **Flash Messages**: Users see appropriate error messages if they try to access admin features
4. **Role Validation**: Server-side validation ensures only admins can perform admin actions

## Testing the Admin System

### Test as Regular User:
1. Sign up with a new account
2. Try to access `/listings/new` - should be redirected
3. View a listing - should NOT see Edit/Delete buttons
4. Navbar should NOT show "Add Listing" button

### Test as Admin:
1. Sign up with a new account
2. Make yourself admin using the script
3. Log out and log back in
4. Access `/listings/new` - should work
5. View a listing - should see Edit/Delete buttons
6. Navbar should show "Add Listing" button

## Default Admin Setup

To create your first admin user:

1. Start the application:
   ```bash
   npm start
   ```

2. Sign up with your admin credentials at:
   ```
   http://localhost:8080/signup
   ```

3. Stop the server (Ctrl+C)

4. Make yourself admin:
   ```bash
   cd backend
   npm run make-admin your_username
   ```

5. Restart the server:
   ```bash
   npm start
   ```

6. Log in with your admin account

## Troubleshooting

### "User not found" error
- Make sure you've signed up first
- Check the exact username (case-sensitive)
- Run `npm run list-users` to see all usernames

### Admin buttons not showing
- Log out and log back in after being made admin
- Clear browser cache
- Check that `currUser.role === "admin"` in browser console

### Cannot access admin routes
- Verify your role in database: `db.users.findOne({username: "your_username"})`
- Make sure you're logged in
- Check server logs for errors

## Future Enhancements

Consider adding:
- Admin dashboard with statistics
- User management panel
- Bulk listing operations
- Activity logs
- Multiple admin levels (super admin, moderator, etc.)
