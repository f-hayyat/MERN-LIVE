const express = require('express');
const adminOrdersController = require('../controllers/adminOrdersController');
const adminOrdersRouer = express.Router();
const { isAdmin, protect } = require('../middlewares/authMiddleware');


adminOrdersRouer.get('/', protect, isAdmin, adminOrdersController.getAllOrders);
adminOrdersRouer.put('/:id', protect, isAdmin, adminOrdersController.updateOrderStatus);
adminOrdersRouer.delete('/:id', protect, isAdmin, adminOrdersController.deleteOrder);



module.exports = adminOrdersRouer;