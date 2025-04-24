const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controllers/cartController');
const { protect, isAdmin } = require("../middlewares/authMiddleware"); // Import the auth middleware


cartRouter.post('/', cartController.addToCart); // Add item to cart
cartRouter.put('/', cartController.updateCartItem); // Update cart item
cartRouter.delete('/', cartController.deleteCartItem); // Delete cart item
cartRouter.get('/', cartController.getCart); // Get cart items
cartRouter.post('/merge',protect, cartController.mergeCarts); // Merge carts


module.exports = cartRouter; // Export the router