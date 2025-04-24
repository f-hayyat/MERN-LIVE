const express = require("express");
const orderRouter = express.Router();
const { protect, isAdmin } = require("../middlewares/authMiddleware");
const orderController = require("../controllers/orderController");

orderRouter.get("/my-orders", protect, orderController.getOrders);// Get all orders for a user
orderRouter.get("/:id", protect, orderController.getOrderById);// Get order by ID

module.exports = orderRouter;
