# Quick Start Guide

## Running the Application

### Option 1: From Root Directory (Recommended)
```bash
npm start
```
or for development with auto-restart:
```bash
npm run dev
```

### Option 2: From Backend Directory
```bash
cd backend
node app.js
```

## First Time Setup

1. Make sure MongoDB is running:
```bash
mongod
```

2. (Optional) Seed the database with sample data:
```bash
npm run seed
```
or
```bash
cd backend
node init/index.js
```

3. Start the application:
```bash
npm start
```

4. Open your browser and visit:
```
http://localhost:8080
```

## Project Structure

```
Major_project/
├── backend/          # All server-side code
│   ├── app.js        # Main entry point
│   ├── models/       # Database schemas
│   ├── routes/       # API routes
│   ├── controllers/  # Business logic
│   ├── middleware/   # Auth & validation
│   ├── config/       # Configuration files
│   └── utils/        # Helper functions
│
├── frontend/         # All client-side code
│   ├── views/        # EJS templates
│   └── public/       # CSS & JavaScript
│
└── uploads/          # File upload directory
```

## Environment Variables

Make sure `backend/.env` contains:
```
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
```

## Troubleshooting

If you get module errors:
1. Make sure you're in the root directory
2. Run `npm install` in the backend folder if needed
3. Check that MongoDB is running

## Available Scripts

- `npm start` - Start the server
- `npm run dev` - Start with nodemon (auto-restart)
- `npm run seed` - Seed database with sample data
