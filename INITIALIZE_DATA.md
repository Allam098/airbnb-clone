# Initialize Data on Render

## Problem
No listings showing on the home page because MongoDB Atlas database is empty.

## Solution
You need to populate your MongoDB Atlas database with sample data.

## Option 1: Using Render Shell (Recommended)

### Step 1: Access Render Shell
1. Go to your Render dashboard
2. Click on your web service
3. Click on "Shell" tab in the left sidebar

### Step 2: Create Admin User
```bash
cd backend
npm run fix-admin
```

This creates:
- Username: `wanderlust_admin`
- Password: `WanderLust@2024`

### Step 3: Initialize Sample Listings
```bash
node init/index.js
```

This will add 34 sample listings to your database.

## Option 2: Using Local Machine

If you have the MongoDB Atlas connection string configured locally:

### Step 1: Update your local backend/.env
Make sure it has:
```
MONGODB_URI=mongodb+srv://vamsi:Vamsi@cluster0.qwxml6x.mongodb.net/wanderlust?retryWrites=true&w=majority
```

### Step 2: Run from your local machine
```bash
cd backend
npm run fix-admin
node init/index.js
```

## Option 3: Manual Data Entry

1. Login as admin: `https://your-app.onrender.com/admin/login`
   - Username: `wanderlust_admin`
   - Password: `WanderLust@2024`

2. Click "Add Listing" and manually add listings

## Verify Data

After initialization, check if data exists:

### Using Render Shell:
```bash
cd backend
npm run check-listings
npm run check-users
```

### Using MongoDB Atlas Dashboard:
1. Go to https://cloud.mongodb.com/
2. Click "Browse Collections"
3. Select "wanderlust" database
4. You should see: users, listings collections

## Troubleshooting

### If init fails with "No user found"
You need to create a user first:
1. Go to your app: `https://your-app.onrender.com/signup`
2. Create any user account
3. Then run the init script again

### If you get connection errors
- Verify MongoDB Atlas IP whitelist allows 0.0.0.0/0
- Check MONGODB_URI environment variable in Render
- Ensure MongoDB cluster is not paused

## Quick Start Commands

Run these in Render Shell in order:
```bash
cd backend
npm run fix-admin
node init/index.js
npm run check-listings
```

You should see "Total Listings in Database: 34"
