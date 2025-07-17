import express from 'express';
import cors from 'cors';
import { connectDB } from './db/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors({
  origin: 'https://frontend-owf6.onrender.com',
  // Frontend URL
  credentials: true // Allow cookies to be sent
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
import passport from 'passport';
import session from 'express-session';
import './middleware/passport.js';
const port = process.env.PORT || 3000;
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000,
    // 24 hours
    path: '/' 
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/images", express.static("uploads"));
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.listen(port, () => {
  connectDB();
});