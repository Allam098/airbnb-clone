# Render Deployment Instructions

## Quick Setup

### 1. Root Directory Configuration
**Root Directory**: Leave **EMPTY** or set to `/`

### 2. Build & Start Commands
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && node app.js`

### 3. Environment Variables to Add in Render Dashboard

Go to your Render service → Environment tab and add these:

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

## Step-by-Step Deployment

### Step 1: Create New Web Service
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `https://github.com/Allam098/airbnb-clone`

### Step 2: Configure Service
Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `wanderlust-airbnb` (or any name you prefer) |
| **Root Directory** | Leave empty or `/` |
| **Environment** | `Node` |
| **Region** | Choose closest to you |
| **Branch** | `main` |
| **Build Command** | `cd backend && npm install` |
| **Start Command** | `cd backend && node app.js` |
| **Instance Type** | Free (or paid if you prefer) |

### Step 3: Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"** and add all 7 variables listed above.

### Step 4: Deploy
1. Click **"Create Web Service"**
2. Render will automatically build and deploy your app
3. Wait for deployment to complete (usually 2-5 minutes)

### Step 5: Initialize Admin User
After deployment succeeds:

1. Go to your Render service → **Shell** tab
2. Run these commands:
   ```bash
   cd backend
   npm run fix-admin
   ```

This creates the admin user with credentials:
- Username: `wanderlust_admin`
- Password: `WanderLust@2024`

### Step 6: Access Your App
Your app will be available at: `https://wanderlust-airbnb.onrender.com` (or your chosen name)

- **Landing Page**: `https://your-app.onrender.com/`
- **Admin Login**: `https://your-app.onrender.com/admin/login`
- **User Signup**: `https://your-app.onrender.com/signup`

## Important Notes

### MongoDB Atlas Configuration
⚠️ **CRITICAL**: Ensure MongoDB Atlas allows connections from Render:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Navigate to: **Network Access** → **IP Access List**
3. Click **"Add IP Address"**
4. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
5. Click **"Confirm"**

### Free Tier Limitations
- Render free tier spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds to wake up
- Consider upgrading to paid tier for production use

### Auto-Deploy
Render automatically redeploys when you push to GitHub:
```bash
git add .
git commit -m "Update feature"
git push origin main
```

## Troubleshooting

### Build Fails
- Check that `backend/package.json` exists
- Verify build command: `cd backend && npm install`
- Check build logs in Render dashboard

### App Crashes on Start
- Verify start command: `cd backend && node app.js`
- Check all environment variables are set correctly
- Review logs in Render dashboard

### Database Connection Fails
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0)
- Ensure MongoDB cluster is not paused

### Emails Not Sending
- Verify `EMAIL_USER` and `EMAIL_PASSWORD` are correct
- Ensure Gmail App Password is used (not regular password)
- Check that 2FA is enabled on Gmail account

## Alternative: Using render.yaml

If you prefer infrastructure-as-code, the `render.yaml` file in the root directory can be used:

1. In Render dashboard, go to **"New +"** → **"Blueprint"**
2. Connect your repository
3. Render will automatically detect `render.yaml`
4. Add environment variable values in the dashboard
5. Deploy

## Monitoring

After deployment:
- **Logs**: Check real-time logs in Render dashboard
- **Metrics**: Monitor CPU, memory usage
- **Events**: Track deployments and restarts

## Custom Domain (Optional)

To use your own domain:
1. Go to your service → **Settings** → **Custom Domain**
2. Add your domain
3. Update DNS records as instructed by Render
4. Wait for SSL certificate to be issued (automatic)

## Support

- Render Docs: https://render.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- Project Issues: https://github.com/Allam098/airbnb-clone/issues
