# 📝 A Full Stack Blog Application

A modern, feature-rich blog platform built with the MERN stack (MongoDB, Express, React, Node.js) that allows users to create, manage, and share blog posts with seamless authentication and a beautiful user interface.

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)

## ✨ Features

### 🔐 Authentication & Authorization
- **Email/Password Authentication** with JWT tokens and HTTP-only cookies
- **Google OAuth 2.0** integration for quick sign-up/login
- **Email Verification** system with 6-digit verification codes
- **Password Reset** functionality with secure token-based reset links
- **Protected Routes** with middleware authentication
- **Session Management** with secure cookie handling

### 📰 Blog Management
- **Create Blogs** with title, description, and image upload
- **Edit & Delete** your own blog posts
- **View All Blogs** with pagination and search functionality
- **Personal Dashboard** to manage all your blogs in one place
- **Image Upload** support with Multer middleware
- **Blog Filtering** by title with search functionality

### 🎨 User Experience
- **Responsive Design** using Tailwind CSS
- **Search Functionality** to find blogs by title
- **Pagination** for efficient blog browsing with customizable items per page
- **Real-time Feedback** with loading states and error messages
- **Mobile-Friendly Navigation** with hamburger menu
- **Hero Section** with engaging landing page
- **Footer** with important links and information

## 🛠️ Tech Stack

### Frontend
- **React** (v19.1.0) - UI library for building component-based interfaces
- **React Router DOM** (v7.6.3) - Client-side routing and navigation
- **Tailwind CSS** (v4.1.11) - Utility-first CSS framework
- **Axios** (v1.10.0) - Promise-based HTTP client
- **Vite** (v7.0.0) - Fast build tool and development server
- **Context API** - State management for authentication

### Backend
- **Node.js** with **Express** (v5.1.0) - Server framework
- **MongoDB** with **Mongoose** (v8.16.1) - Database and ODM
- **Passport.js** - Authentication middleware for OAuth
- **JWT** (jsonwebtoken) - Token-based authentication
- **bcryptjs** - Password hashing and security
- **Multer** - File upload handling middleware
- **Resend** - Email service for verification and password reset
- **Zod** - Schema validation for type safety
- **express-session** - Session management
- **cookie-parser** - Cookie parsing middleware
- **cors** - Cross-origin resource sharing

## 📁 Project Structure

```
A-Full-Stack-Blog-App/
├── backend/
│   ├── controller/
│   │   ├── authController.js      # Authentication logic (signup, login, verify, etc.)
│   │   └── blogController.js      # Blog CRUD operations
│   ├── db/
│   │   └── db.js                  # MongoDB connection configuration
│   ├── emails/
│   │   ├── emailTemplate.js       # HTML email templates
│   │   ├── resend.js             # Resend email service configuration
│   │   └── sendingmails.js       # Email sending utility functions
│   ├── middleware/
│   │   ├── multer.js             # File upload middleware configuration
│   │   ├── passport.js           # Google OAuth strategy configuration
│   │   └── verifyJWT.js          # JWT token verification middleware
│   ├── models/
│   │   ├── blogModel.js          # Blog mongoose schema and model
│   │   └── userModel.js          # User mongoose schema and model
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication API routes
│   │   └── blogRoutes.js         # Blog API routes
│   ├── utlis/
│   │   ├── jwtAndCookie.js       # JWT generation and cookie utilities
│   │   └── verificationToken.js  # Verification token generation
│   ├── index.js                  # Server entry point and configuration
│   └── package.json              # Backend dependencies
│
└── frontend/
    ├── public/
    │   └── vite.svg              # Vite logo
    ├── src/
    │   ├── assets/
    │   │   ├── react.svg         # React logo
    │   │   └── SampleBlogs.jsx   # Sample blog data
    │   ├── components/
    │   │   ├── BlogCard.jsx      # Individual blog card component
    │   │   ├── BlogGrid.jsx      # Blog grid with pagination
    │   │   ├── Footer.jsx        # Footer component
    │   │   ├── Hero.jsx          # Hero section for home page
    │   │   └── Navbar.jsx        # Navigation bar with auth status
    │   ├── context/
    │   │   └── AuthContext.jsx   # Authentication context provider
    │   ├── pages/
    │   │   ├── Blogs.jsx         # Individual blog view page
    │   │   ├── Dashboard.jsx     # User dashboard with tabs
    │   │   ├── ForgetPassword.jsx # Password reset request page
    │   │   ├── Home.jsx          # Home page with hero and blogs
    │   │   ├── Login.jsx         # Login page
    │   │   ├── ResetPassword.jsx # Password reset form page
    │   │   ├── Signup.jsx        # Registration page
    │   │   └── Verifycode.jsx    # Email verification page
    │   ├── api.jsx               # Axios instance and API calls
    │   ├── App.jsx               # Main app component with routing
    │   ├── App.css               # App-specific styles
    │   ├── index.css             # Global styles with Tailwind
    │   └── main.jsx              # React app entry point
    ├── index.html                # HTML template
    ├── package.json              # Frontend dependencies
    ├── vite.config.js            # Vite configuration
    ├── eslint.config.js          # ESLint configuration
    └── README.md                 # Frontend-specific documentation
```

## 🚦 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Google Cloud Console** account (for OAuth credentials)
- **Resend** account (for email service)

### Environment Variables

Create a `.env` file in the **backend** directory with the following variables:

```env
# Database Configuration
MONGO_URL=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# Session Configuration
SESSION_SECRET=your_session_secret_key

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# Email Service Configuration
RESEND=your_resend_api_key

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Server Configuration
PORT=3000
NODE_ENV=development
```

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/sachinpoudel/A-Full-Stack-Blog-App.git
cd A-Full-Stack-Blog-App
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

4. **Set up environment variables**
   - Create a `.env` file in the `backend` directory
   - Add all the required environment variables (see above)

5. **Start MongoDB**
   - If using local MongoDB: `mongod`
   - If using MongoDB Atlas: ensure your connection string is correct

6. **Start the backend server**
```bash
cd backend
npm start
# or for development with auto-reload
npm run dev
```

7. **Start the frontend development server** (in a new terminal)
```bash
cd frontend
npm run dev
```

The application should now be running:
- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:3000`

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/signup` | Register a new user | ❌ |
| POST | `/login` | User login with credentials | ❌ |
| POST | `/logout` | User logout | ✅ |
| POST | `/verify-email` | Verify email with 6-digit code | ❌ |
| POST | `/forgot-password` | Request password reset email | ❌ |
| POST | `/reset-password/:token` | Reset password with token | ❌ |
| GET | `/check-auth` | Check authentication status | ✅ |
| GET | `/google` | Initiate Google OAuth login | ❌ |
| GET | `/google/callback` | Google OAuth callback handler | ❌ |

### Blog Routes (`/api/blog`)

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | `/allblogs` | Get all blogs (pagination & search) | ❌ |
| GET | `/userblogs` | Get authenticated user's blogs | ✅ |
| POST | `/create` | Create a new blog post | ✅ |
| PUT | `/update/:id` | Update a blog post | ✅ |
| DELETE | `/delete/:id` | Delete a blog post | ✅ |
| GET | `/:id` | Get a single blog by ID | ❌ |

**Query Parameters for `/allblogs`:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 6)
- `search` - Search term for blog titles

## 🔒 Security Features

- **Password Hashing** - bcryptjs with salt rounds for secure password storage
- **JWT Authentication** - Token-based authentication with expiration
- **HTTP-Only Cookies** - Secure cookie storage for tokens
- **CORS Configuration** - Cross-origin resource sharing setup
- **Input Validation** - Zod schema validation for all inputs
- **Protected Routes** - Middleware to protect sensitive endpoints
- **Secure Sessions** - Express session with secret key
- **Token Expiration** - Automatic token expiration handling
- **Email Verification** - Required email verification for new accounts

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** - 1024px and above
- **Tablet** - 768px to 1023px
- **Mobile** - Below 768px

Features responsive navigation, flexible grid layouts, and mobile-friendly forms.

## 🎨 Key Components

### `AuthContext` (`frontend/src/context/AuthContext.jsx`)
Global state management for authentication, providing:
- User authentication state
- Login/logout functions
- User data management
- Blog data fetching and caching

### `Dashboard` (`frontend/src/pages/Dashboard.jsx`)
User's personal dashboard with tabbed interface:
- **My Blogs** - View and manage all your blog posts
- **Create New Blog** - Form to create new blog posts
- **Profile** - View user profile information

### `BlogGrid` (`frontend/src/components/BlogGrid.jsx`)
Display all blogs with advanced features:
- Search by title functionality
- Pagination controls (previous/next)
- Customizable items per page
- Responsive grid layout

### `Navbar` (`frontend/src/components/Navbar.jsx`)
Responsive navigation component:
- Mobile hamburger menu
- Authentication status display
- Dynamic links based on auth state
- Smooth transitions and animations

### `BlogCard` (`frontend/src/components/BlogCard.jsx`)
Individual blog post card with:
- Blog image display
- Title and description
- Author information
- Read more link

## 🚀 Deployment

### Backend Deployment (Render/Heroku)
1. Push code to GitHub
2. Connect repository to hosting service
3. Set environment variables in dashboard
4. Deploy from main branch

### Frontend Deployment (Vercel/Netlify)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy

**Live Demo:**
- Frontend: `https://a-full-stack-blog-app1.onrender.com`
- Backend API: `https://a-full-stack-blog-app.onrender.com`

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access in MongoDB Atlas

**Google OAuth Not Working**
- Verify OAuth credentials
- Check callback URL matches Google Console
- Ensure frontend URL is whitelisted

**Email Not Sending**
- Verify Resend API key
- Check email template configuration
- Ensure sender email is verified

## 📝 Future Enhancements

- [ ] Comment system for blog posts
- [ ] Like/favorite functionality
- [ ] User profile customization
- [ ] Blog categories and tags
- [ ] Draft saving feature
- [ ] Rich text editor for blog content
- [ ] Social media sharing
- [ ] Admin dashboard
- [ ] Blog analytics

## 📄 License

This project is licensed under the **ISC License**.

## 👨‍💻 Author

**Sachin Poudel**
- GitHub: [@sachinpoudel](https://github.com/sachinpoudel)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

## 🙏 Acknowledgments

- React team for the amazing library
- MongoDB for the flexible database
- Tailwind CSS for the utility-first framework
- All open-source contributors

---

**Made using the MERN Stack**