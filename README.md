# WanderLust - Vacation Rental Platform

A full-stack Airbnb-like vacation rental platform built with Node.js, Express, MongoDB, and EJS.

## Project Structure

The project has been organized into separate backend and frontend folders:

```
Major_project/
├── backend/                    # Backend server code
│   ├── config/                 # Configuration files
│   │   └── cloudConfig.js      # Cloudinary setup
│   ├── controllers/            # Route controllers
│   │   ├── listings.js         # Listing CRUD operations
│   │   ├── reviews.js          # Review operations
│   │   └── users.js            # User authentication
│   ├── middleware/             # Custom middleware
│   │   ├── middleware.js       # Auth & validation middleware
│   │   └── schema.js           # Joi validation schemas
│   ├── models/                 # Mongoose models
│   │   ├── listing.js          # Listing schema
│   │   ├── review.js           # Review schema
│   │   └── user.js             # User schema
│   ├── routes/                 # Express routes
│   │   ├── listing.js          # Listing routes
│   │   ├── review.js           # Review routes
│   │   └── user.js             # User routes
│   ├── utils/                  # Utility functions
│   │   ├── ExpressError.js     # Custom error class
│   │   └── wrapAsync.js        # Async error handler
│   ├── init/                   # Database initialization
│   │   ├── data.js             # Sample data
│   │   └── index.js            # DB seeding script
│   ├── app.js                  # Main application file
│   ├── category.js             # Category update script
│   ├── .env                    # Environment variables
│   ├── package.json            # Dependencies
│   └── package-lock.json       # Locked dependencies
│
├── frontend/                   # Frontend views and assets
│   ├── views/                  # EJS templates
│   │   ├── layouts/            # Layout templates
│   │   │   └── boilerplate.ejs # Main layout
│   │   ├── includes/           # Reusable partials
│   │   │   ├── navbar.ejs      # Navigation bar
│   │   │   ├── footer.ejs      # Footer
│   │   │   └── flash.ejs       # Flash messages
│   │   ├── listings/           # Listing views
│   │   │   ├── index.ejs       # All listings
│   │   │   ├── show.ejs        # Single listing
│   │   │   ├── new.ejs         # Create listing
│   │   │   └── edit.ejs        # Edit listing
│   │   ├── users/              # User views
│   │   │   ├── login.ejs       # Login page
│   │   │   └── signup.ejs      # Signup page
│   │   └── error.ejs           # Error page
│   └── public/                 # Static assets
│       ├── css/
│       │   └── style.css       # Custom styles
│       └── js/
│           └── script.js       # Client-side JS
│
├── uploads/                    # File upload directory
└── node_modules/               # Dependencies (shared)
```

## Tech Stack

- **Backend**: Node.js, Express.js v5.2.1
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js (Local Strategy)
- **File Upload**: Multer + Cloudinary
- **Validation**: Joi
- **View Engine**: EJS with ejs-mate
- **Styling**: Bootstrap 5 + Custom CSS

## Features

- User authentication (signup/login/logout)
- CRUD operations for property listings
- Image upload to Cloudinary
- Category filtering (Trending, Beach, Mountain, City, etc.)
- Search functionality (by title, location, country)
- Review system with star ratings
- Owner-only edit/delete permissions
- Responsive design
- Flash messages for user feedback

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or remote connection)
- Cloudinary account (for image uploads)

### Installation

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `backend/.env`:
```
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
```

4. Start MongoDB (if running locally):
```bash
mongod
```

5. (Optional) Seed the database:
```bash
node init/index.js
```

6. Start the server:
```bash
node app.js
```

7. Open your browser and visit:
```
http://localhost:8080
```

## API Routes

### Listings
- `GET /listings` - View all listings (with search & filter)
- `GET /listings/new` - Show create listing form
- `POST /listings` - Create new listing
- `GET /listings/:id` - View single listing
- `GET /listings/:id/edit` - Show edit form
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Reviews
- `POST /listings/:id/reviews` - Add review
- `DELETE /listings/:id/reviews/:reviewId` - Delete review

### Users
- `GET /signup` - Show signup form
- `POST /signup` - Register new user
- `GET /login` - Show login form
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

## License

ISC
