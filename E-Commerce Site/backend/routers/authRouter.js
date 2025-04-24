const express = require("express");
const authRouter = express.Router();
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController"); // update path as needed

// 📝 Signup Route
authRouter.post("/signup", signup);

// 🔐 Login Route
authRouter.post("/login", login);

// 🔁 Forgot Password Route (Send OTP)
authRouter.post("/forgot-password", forgotPassword);

// 🔒 Reset Password Route (with OTP)
authRouter.post("/reset-password", resetPassword);

module.exports = authRouter;
