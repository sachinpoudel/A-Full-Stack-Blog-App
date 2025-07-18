import express from 'express';
import { forgotPassword, resetPassword, login, logOut, checkAuth, signUp, verifyEmail } from '../controller/authController.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
import passport from 'passport';
import { jwtAndCookie } from '../utlis/jwtAndCookie.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logOut);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/check-auth', verifyJWT, checkAuth);
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));
router.get('/google/callback', passport.authenticate('google', {}), (req, res) => {
  try {
    jwtAndCookie(res, req.user._id);
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  } catch (error) {
    res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
  }
});
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      return res.status(500).json({
        message: 'Logout failed'
      });
    }
    res.clearCookie('connect.sid', {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/"
    });
    
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/"
    });
    
    // Use environment variable for URL
    res.redirect(`${process.env.FRONTEND_URL}/signup`);
  });
});
export default router;