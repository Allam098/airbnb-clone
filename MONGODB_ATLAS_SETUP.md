# MongoDB Atlas Setup Guide

## Connection Status
✅ Your application is now configured to connect to MongoDB Atlas:
- **Cluster**: cluster0.qwxml6x.mongodb.net
- **Database**: wanderlust
- **Username**: vamsi

## Initial Setup Steps

### 1. Start the Server
```bash
cd backend
node app.js
```

The server will connect to MongoDB Atlas automatically. You should see:
```
MongoDB connected successfully ✅
server is listening to the port 8080
```

### 2. Create Admin User
Run this command to create the admin user in your Atlas database:
```bash
npm run fix-admin
```

This will create:
- Username: `wanderlust_admin`
- Password: `WanderLust@2024`
- Role: admin

### 3. Initialize Sample Listings (Optional)
First, you need at least one user in the database. Then run:
```bash
cd backend
node init/index.js
```

This will populate your Atlas database with 34 sample listings.

## What Happens Automatically

MongoDB Atlas will automatically create:
- ✅ Database: `wanderlust` (when first data is written)
- ✅ Collections: `users`, `listings`, `bookings`, `reviews` (as needed)
- ✅ Indexes and schemas (defined in your Mongoose models)

## Verify Connection

### Check Users
```bash
npm run check-users
```

### Check Listings
```bash
npm run check-listings
```

## Access Your Application

1. **Admin Portal**: http://localhost:8080/admin/login
   - Username: `wanderlust_admin`
   - Password: `WanderLust@2024`

2. **User Signup**: http://localhost:8080/signup
   - Create regular user accounts

3. **Landing Page**: http://localhost:8080/

## Troubleshooting

### If connection fails:
1. Check your MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for testing)
2. Verify username/password are correct
3. Ensure your cluster is running (not paused)

### If you need to reset:
```bash
# Reset admin password
npm run fix-admin

# List all users
npm run check-users
```

## Important Notes

- 📝 No need to create schemas manually - Mongoose handles this
- 🔒 Your data is stored in MongoDB Atlas cloud
- 🌐 Accessible from anywhere with internet connection
- 💾 Free tier includes 512MB storage
