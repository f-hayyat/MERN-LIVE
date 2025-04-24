const express = require('express');
const adminProductsRouter = express.Router();
const adminProductsController = require("../controllers/adminProductsController")
const { protect, isAdmin } = require("../middlewares/authMiddleware")

adminProductsRouter.get("/", protect, isAdmin, adminProductsController.getAllProducts)







module.exports = adminProductsRouter;