const express = require("express");
const userRouter = express.Router();
const {protect} = require("../middlewares/authMiddleware"); // Import the auth middleware
const { profile } = require("../controllers/userController"); // Import the controller function

userRouter.get("/profile", protect, profile); // Protect the profile route with auth middleware


module.exports = userRouter; // Export the router