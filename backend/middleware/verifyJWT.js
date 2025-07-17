import { jwtAndCookie } from "../utlis/jwtAndCookie.js";
import jwt from 'jsonwebtoken';
import User from "../models/userModel.js";
export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized access, token not found",
        success: false
      });
    }
    ;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        message: "token not verified unauthorized",
        success: false
      });
    }
    ;
    req.userId = decoded.userId;
    const user = await User.findById(req.userId);
    if (decoded.userId) {
      const user = await User.findById(decoded.userId);
      if (user) {
        req.name = user.name;
        req.image = user.avatar;
      }
      next(); // Ensure next() is called properly
    } else {
      return res.status(401).json({
        message: "Unauthorized access",
        success: false
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};