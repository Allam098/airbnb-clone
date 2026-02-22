# Restore Listings Guide

## 🔍 Issue: Listings Not Showing

If your listings are not showing up, it's likely because:
1. The database needs to be seeded
2. Listings don't have the required `category` field
3. MongoDB connection issue

## ✅ Solution: Restore Your Listings

### Step 1: Check if Listings Exist

```bash
cd backend
npm run check-listings
```

This will show you:
- How many listings are in the database
- Sample listings with their details

### Step 2: Seed the Database

If you have no listings or need to add sample data:

```bash
cd backend
npm run seed
```

This will:
- Delete all existing listings
- Add 20 sample listings with categories
- Assign them to the first user in database

**Important**: Make sure you have at least one user account before seeding!

### Step 3: Verify Listings Are Back

1. Start the server:
```bash
npm start
```

2. Visit:
```
http://localhost:8080/listings
```

3. You should see all 20 listings!

## 🎯 What Was Fixed

### 1. Added Categories to Sample Data
All sample listings now have proper categories:
- Beach (5 listings)
- City (4 listings)
- Mountain (3 listings)
- Luxury (5 listings)
- Nature (3 listings)

### 2. Updated Data Structure
Each listing now includes:
```javascript
{
  title: "...",
  description: "...",
  image: { url: "...", filename: "..." },
  price: 1500,
  location: "...",
  country: "...",
  category: "Beach"  // ← Added this!
}
```

### 3. Created Check Script
New command to verify listings:
```bash
npm run check-listings
```

## 📋 Available Commands

| Command | Purpose |
|---------|---------|
| `npm run check-listings` | Check how many listings exist |
| `npm run seed` | Add sample listings to database |
| `npm run list-users` | See all users |
| `npm run create-admin` | Create admin user |
| `npm start` | Start the server |

## 🐛 Troubleshooting

### "No listings found in database"
**Solution**: Run `npm run seed`

### "No user found. Please signup first."
**Solution**: 
1. Start server: `npm start`
2. Go to: `http://localhost:8080/signup`
3. Create an account
4. Stop server and run: `npm run seed`

### Listings still not showing
**Check**:
1. MongoDB is running: `mongod`
2. Server is running: `npm start`
3. No errors in console
4. Visit correct URL: `http://localhost:8080/listings`

### Category filter not working
**Solution**: All listings now have categories, so filters should work!

## 🎨 Sample Listings Breakdown

After seeding, you'll have:

**Beach Properties** (5):
- Cozy Beachfront Cottage (Malibu)
- Beachfront Paradise (Cancun)
- Beachfront Bungalow (Bali)
- Art Deco Apartment (Miami)
- Tropical Villa (Phuket)

**City Properties** (4):
- Modern Loft (New York)
- Historic Canal House (Amsterdam)
- Historic Brownstone (Boston)

**Mountain Properties** (3):
- Mountain Retreat (Aspen)
- Ski-In/Ski-Out Chalet (Verbier)
- Mountain View Cabin (Banff)

**Luxury Properties** (5):
- Historic Villa (Tuscany)
- Luxury Penthouse (Los Angeles)
- Private Island Retreat (Fiji)
- Historic Castle (Scotland)
- Desert Oasis (Dubai)

**Nature Properties** (3):
- Secluded Treehouse (Portland)
- Rustic Cabin (Lake Tahoe)
- Safari Lodge (Serengeti)
- Charming Cottage (Cotswolds)

## ✨ Features Now Working

After restoring listings:
- ✅ Browse all listings
- ✅ Search by location/title
- ✅ Filter by category
- ✅ Filter by price range
- ✅ View listing details
- ✅ Leave reviews (when logged in)
- ✅ Add/edit/delete listings (admin only)
- ✅ Blurred background on landing page

## 🚀 Quick Start (Fresh Setup)

If starting from scratch:

```bash
# 1. Start MongoDB
mongod

# 2. Navigate to backend
cd backend

# 3. Create admin user
npm run create-admin

# 4. Seed database
npm run seed

# 5. Start server
npm start

# 6. Visit site
# http://localhost:8080
```

## 📝 Notes

- Seeding will DELETE all existing listings
- Listings are assigned to the first user found
- All listings have proper categories now
- Images are from Unsplash (external URLs)
- Prices range from ₹800 to ₹10,000

## 🔄 Re-seeding

If you want to reset and start fresh:

```bash
cd backend
npm run seed
```

This is safe to run multiple times!

## ✅ Verification Checklist

After seeding, verify:
- [ ] Can see listings at `/listings`
- [ ] Can search listings
- [ ] Can filter by category
- [ ] Can filter by price
- [ ] Can view individual listing
- [ ] Landing page shows blurred listings
- [ ] All 20 listings are present
- [ ] Each listing has a category
- [ ] Images load correctly

## 🎉 Success!

Once you run `npm run seed`, you should have:
- 20 beautiful sample listings
- All with proper categories
- Ready to browse and filter
- Visible on landing page background

Your WanderLust platform is now fully populated! 🏠✨
