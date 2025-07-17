import mongoose, { Mongoose } from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId; 
    }
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
    required: function () {
      return !this.email; // googleId is required only if email is not set
    }
  },
  isverified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  resetToken: String,
  resetTokenExpiry: Date,
  verificationToken: String,
  verificationTokenExpiry: Date
}, {
  timestamps: true
});
userSchema.pre("save", async function (next) {
  // Only hash the password if it's been modified (or is new)
  if (this.googleId || !this.isModified("password") || !this.password) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model("People", userSchema);
export default User;