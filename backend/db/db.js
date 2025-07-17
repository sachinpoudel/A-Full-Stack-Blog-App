import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {}
};