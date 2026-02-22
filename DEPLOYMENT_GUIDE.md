# WanderLust Deployment Guide

## Environment Variables Location

✅ **All environment variables are in**: `backend/.env`

This file contains:
- MongoDB Atlas connection string
- Cloudinary credentials (for image uploads)
- Gmail SMTP credentials (for emails)
- Node environment setting

## For Deployment (Render, Heroku, etc.)

### Environment Variables to Set

When deploying, you need to set these environment variables in your hosting platform:

```
MONGODB_URI=mongodb+srv://vamsi:Vamsi@cluster0.qwxml6x.mongodb.net/wanderlust?retryWrites=true&w=majority

CLOUD_NAME=dd7oci4rg
CLOUD_API_KEY=418677537652136
CLOUD_API_SECRET=qnX31SFHfBreE-Nsh-ETW2oX0tc

EMAIL_SERVICE=gmail
EMAIL_USER=vamsikrishnaallam7@gmail.com
EMAIL_PASSWORD=bhxsiukbdmqjfdgc

NODE_ENV=production
```

### Deployment Steps

#### Option 1: Deploy to Render

1. **Create a new Web Service** on Render
2. **Connect your GitHub repository**
3. **Configure Build Settings**:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && node app.js`
   - Root Directory: Leave empty (or set to `/`)

4. **Add Environment Variables** (in Render dashboard):
   - Go to Environment tab
   - Add all variables listed above

5. **Deploy**: Render will automatically deploy your app

#### Option 2: Deploy to Heroku

1. **Install Heroku CLI** and login:
   ```bash
   heroku login
   ```

2. **Create a new Heroku app**:
   ```bash
   heroku create wanderlust-app
   ```

3. **Set environment variables**:
   ```bash
   heroku config:set MONGODB_URI="mongodb+srv://vamsi:Vamsi@cluster0.qwxml6x.mongodb.net/wanderlust?retryWrites=true&w=majority"
   heroku config:set CLOUD_NAME=dd7oci4rg
   heroku config:set CLOUD_API_KEY=418677537652136
   heroku config:set CLOUD_API_SECRET=qnX31SFHfBreE-Nsh-ETW2oX0tc
   heroku config:set EMAIL_SERVICE=gmail
   heroku config:set EMAIL_USER=vamsikrishnaallam7@gmail.com
   heroku config:set EMAIL_PASSWORD=bhxsiukbdmqjfdgc
   heroku config:set NODE_ENV=production
   ```

4. **Create Procfile** in root directory:
   ```
   web: cd backend && node app.js
   ```

5. **Deploy**:
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

#### Option 3: Deploy to Railway

1. **Create account** on Railway.app
2. **New Project** → Deploy from GitHub
3. **Select your repository**
4. **Add environment variables** in Variables tab
5. **Set start command**: `cd backend && node app.js`
6. **Deploy**

### Important Notes

- ✅ `.env` file is in `.gitignore` - it won't be committed to Git
- ✅ MongoDB Atlas is already configured (cloud database)
- ✅ Cloudinary is configured for image uploads
- ✅ Gmail SMTP is configured for emails
- ⚠️ Make sure to set `NODE_ENV=production` in deployment
- ⚠️ Ensure your MongoDB Atlas IP whitelist allows connections from anywhere (0.0.0.0/0) or add your hosting provider's IPs

### After Deployment

1. **Create admin user** by running the fix-admin script:
   - SSH into your server or use the hosting platform's console
   - Run: `cd backend && npm run fix-admin`

2. **Initialize sample data** (optional):
   - Run: `cd backend && node init/index.js`

3. **Access your app**:
   - Admin: `https://your-app-url.com/admin/login`
   - User: `https://your-app-url.com/`

## Project Structure

```
Major_project/
├── backend/              # Backend server (Node.js/Express)
│   ├── .env             # ✅ Environment variables HERE
│   ├── app.js           # Main server file
│   ├── models/          # Database models
│   ├── controllers/     # Route controllers
│   ├── routes/          # API routes
│   └── package.json     # Backend dependencies
├── frontend/            # Frontend (EJS views + static files)
│   ├── views/           # EJS templates
│   └── public/          # CSS, JS, images
└── uploads/             # User uploaded files
```

## Security Checklist

- ✅ `.env` file is gitignored
- ✅ Using environment variables for secrets
- ✅ MongoDB Atlas (cloud database with authentication)
- ✅ Gmail App Password (not regular password)
- ⚠️ Change default admin password after first login
- ⚠️ Use HTTPS in production (most hosting platforms provide this)

## Troubleshooting

### If deployment fails:
1. Check build logs for errors
2. Verify all environment variables are set correctly
3. Ensure MongoDB Atlas IP whitelist is configured
4. Check that start command is correct: `cd backend && node app.js`

### If emails don't work:
1. Verify Gmail App Password is correct
2. Check that 2FA is enabled on Gmail account
3. Ensure EMAIL_USER and EMAIL_PASSWORD are set in environment variables
