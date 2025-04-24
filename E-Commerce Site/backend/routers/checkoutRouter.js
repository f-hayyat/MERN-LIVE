const express = require("express");
const checkoutRouter = express.Router();
const checkoutController = require("../controllers/checkoutController");
const { protect, isAdmin } = require("../middlewares/authMiddleware"); // Import the auth middleware

checkoutRouter.post("/", protect, checkoutController.createCheckout); // Create a new checkout session
checkoutRouter.put(
  "/:id/pay",
  protect,
  checkoutController.updateCheckoutToPaid
); // Update checkout to paid
checkoutRouter.post(
  "/:id/finalize",
  protect,
  checkoutController.finalizeCheckout
);

module.exports = checkoutRouter; // Export the router
