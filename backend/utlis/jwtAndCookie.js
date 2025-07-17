import jwt from 'jsonwebtoken';
import path from 'path';
export const jwtAndCookie = async (res, userId) => {
  const token = jwt.sign({
    userId
  }, process.env.JWT_SECRET);
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000,
    // 24,
    path: '/' // Important! Cookies won't work without a matching path
  });
  return token;
};