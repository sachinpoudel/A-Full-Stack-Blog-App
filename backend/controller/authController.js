import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { jwtAndCookie } from "../utlis/jwtAndCookie.js";
import { verificationCode } from "../utlis/verificationToken.js";
import crypto from "crypto";
import { z } from "zod";
import { sendVerificationEmail, resetPassEmail } from "../emails/sendingmails.js";
const userSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.string().email("invalid email format"),
  password: z.string().min(6, "password must be at least 6 characters long")
});


export const signUp = async (req, res) => {
  try {
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Invalid input",
        success: false,
        errors: result.error.errors
      });
    }
    const {
      name,
      email,
      password
    } = result.data;
    const user = await User.findOne({
      email
    });
    if (user) {
      return res.status(401).json({
        message: "user already exits plz login",
        success: false
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = verificationCode();
    const newUser = await User.create({
      email,
      name,
      // image: image,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiry: Date.now() + 3600000
    }); // 1 hour expiry
    await newUser.save();
    jwtAndCookie(res, newUser._id);
    await sendVerificationEmail(newUser.email, newUser.verificationToken);
    res.status(201).json({
      message: "user created successfully",
      success: true,
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        isverified: newUser.isverified
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message
    });
  }
};
export const verifyEmail = async (req, res) => {
  try {
    const {
      code
    } = req.body;
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiry: {
        $gt: Date.now()
      }
    });
    if (!user) {
      return res.status(401).json({
        message: "code or time invalid",
        success: false
      });
    }
    user.isverified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();
    res.status(200).json({
      message: "email verified successfully",
      success: true
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message
    });
  }
};
const loginSchema = z.object({
  email: z.string().email("invalid email format"),
  password: z.string().min(6, "password must be at least 6 characters long")
});
export const login = async (req, res) => {
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Invalid input",
        success: false,
        errors: result.error.errors
      });
    }
    const {
      email,
      password
    } = result.data;
    const user = await User.findOne({
      email
    });
    if (!user) {
      return res.status(401).json({
        message: "plzz singup first",
        success: false
      });
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.status(401).json({
        message: "invalid email or password",
        success: false
      });
    }
    if (!user.isverified) {
      await reSendVerificationEmail(user.email, user.verificationToken);
      return res.status(401).json({
        message: "a resend verification has been sent, plz verify your email first",
        success: false
      });
    }
    user.lastLogin = Date.now();
    await user.save();
    jwtAndCookie(res, user._id);
    res.status(200).json({
      message: "login success",
      success: true,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        isverified: user.isverified
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message
    });
  }
};
export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/" 
    });

    res.clearCookie("connect.sid", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      domain: "localhost" 
    });
    res.json({
      message: "Logout successful",
      success: true
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const {
      email
    } = req.body;
    const user = await User.findOne({
      email
    });
    if (!user) {
      return res.status(401).json({
        message: "acc with this email doesnot exist",
        success: false
      });
    }
    const resetPassToken = crypto.randomBytes(32).toString("hex");
    const resetPassTokenExpiry = Date.now() + 3600000; // 1 hour expiry

    user.resetToken = resetPassToken;
    user.resetTokenExpiry = resetPassTokenExpiry;
    await user.save();
    await resetPassEmail(user.email, `https://frontend-owf6.onrender.com/${resetPassToken}`);
    res.status(200).json({
      message: "Reset password email sent successfully! Check your email",
      success: true
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message
    });
  }
};
export const resetPassword = async (req, res) => {
  const resetpasswordSchema = z.object({
    password: z.string().min(6, "password must be at least 6 characters long")
  });
  const result = resetpasswordSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Invalid input",
      success: false,
      errors: result.error.errors
    });
  }
  try {
    const token = req.params.token;
    const {
      password
    } = result.data;
    if (!token) {
      return res.status(400).json({
        message: "Reset token is required",
        success: false
      });
    }
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: {
        $gt: Date.now()
      }
    });
    if (!user) {
      return res.status(401).json({
        message: "invalid token or token has expired",
        success: false,
        error: "Token validation failed"
      });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    user.password = hashedPass;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/"
    });
    res.clearCookie("connect.sid", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/"
    });
    res.status(200).json({
      message: "Password reset successfully. Please log in with your new password.",
      success: true
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message
    });
  }
};
export const checkAuth = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized access, user not found",
        success: false
      });
    }
    const user = await User.findById(userId).select("-password -verificationToken -verificationTokenExpiry -resetToken -resetTokenExpiry");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }
    res.status(200).json({
      message: "User authenticated successfully",
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message
    });
  }
};