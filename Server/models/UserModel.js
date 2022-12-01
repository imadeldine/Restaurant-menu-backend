import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your firstname"],
    maxlength: [20, "Your name cannot exceed 20 characters"],
  },

  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Please enter your phone number"],
    trim: true,
    unique: true,
    maxlength: [11, "Your phone number cannot exceed 11 characters"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Users = mongoose.model("users", userSchema);
export default Users;
