import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          googleId: profile.id,
        });
        if (existingUser) {
          return done(null, existingUser);
        }
        const existingUserByEmail = await User.findOne({
          email: profile.emails[0].value,
        });
        if (existingUserByEmail) {
          // Update existing user with Google ID
          existingUserByEmail.googleId = profile.id;
          existingUserByEmail.isverified = true;
          await existingUserByEmail.save();
          return done(null, existingUserByEmail);
        }
        const newUser = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
          googleId: profile.id,
          isverified: true,
          lastLogin: Date.now(),
        });
        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id); // Save entire profile in session
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
