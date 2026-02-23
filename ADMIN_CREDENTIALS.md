# WanderLust Admin Credentials

## Admin Login Information

### Username: `vamsi`
### Password: `Vamsi@2024`

## Additional Details
- **Email:** vamsikrishnaallam7@gmail.com
- **Role:** Admin
- **Permissions:** Full access to all features

## Login URLs

### Production (Render)
- Admin Login: `https://your-app.onrender.com/admin/login`
- Regular Login: `https://your-app.onrender.com/login`

### Local Development
- Admin Login: `http://localhost:8080/admin/login`
- Regular Login: `http://localhost:8080/login`

## Admin Capabilities

As an admin, you can:
- ✅ Add new listings
- ✅ Edit any listing
- ✅ Delete any listing
- ✅ View admin dashboard with analytics
- ✅ View all bookings
- ✅ Manage all users
- ✅ Access all admin-only features

## Database Information

- **Total Listings:** 33
- **All listings owned by:** vamsi
- **Database:** MongoDB Atlas
- **Connection:** mongodb+srv://vamsi:Vamsi@cluster0.qwxml6x.mongodb.net/wanderlust

## Important Notes

⚠️ **Security:**
- Keep these credentials secure
- Change password after first login if needed
- Never commit credentials to Git
- Use environment variables for sensitive data

✅ **Status:**
- Database initialized
- All listings populated
- Admin user active
- Ready for production use

## Need Help?

If you need to reset the admin password or create additional admin users, use these commands:

```bash
cd backend

# Reset vamsi password
npm run reset-admin

# Create additional admin user
npm run create-admin

# Make any user an admin
npm run make-admin <username>
```
