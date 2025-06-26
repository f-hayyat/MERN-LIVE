const express = require('express');
const adminProductsRouter = express.Router();
const adminProductsController = require("../controllers/adminProductsController")
const { protect, isAdmin } = require("../middlewares/authMiddleware")

adminProductsRouter.get("/", protect, isAdmin, adminProductsController.getAllProducts)

// adminProductsRouter.post("/", protect, isAdmin, adminProductsController.createProduct)

 adminProductsRouter.put("/:id", protect, isAdmin, adminProductsController.updateProduct)

// adminProductsRouter.delete("/:id", protect, isAdmin, adminProductsController.deleteProduct)








module.exports = adminProductsRouter;