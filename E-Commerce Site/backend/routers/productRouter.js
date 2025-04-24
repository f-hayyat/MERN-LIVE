const express = require("express");
const productRouter = express.Router();
const { protect, isAdmin } = require("../middlewares/authMiddleware"); // Import the auth middleware
const productController = require("../controllers/productController"); // Import the controller functions

productRouter.post("/", protect, isAdmin, productController.newProduct); // Protect the route with auth middleware
productRouter.put("/:id", protect, isAdmin, productController.updateProduct); // Protect the route with auth middleware
productRouter.delete("/:id", protect, isAdmin, productController.deleteProduct); // Protect the route with auth middleware
productRouter.get("/", productController.getAllProducts); // Public route to get all products
productRouter.get('/bestsellers', productController.getBestSellerProducts); // Public route to get best seller products
productRouter.get('/newarrivals', productController.getNewArrivals); // Public route to get new arrivals
productRouter.get('/:id', productController.getProductById); // Public route to get a product by ID
productRouter.get('/similar/:id', productController.getSimilarProducts); // Public route to get similar products

module.exports = productRouter; // Export the router
