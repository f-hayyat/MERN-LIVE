const express = require('express');
const adminUsersRouter = express.Router();
const { protect, isAdmin } = require('../middlewares/authMiddleware');
const adminUsersController = require('../controllers/adminUsersController');


// Admin routes
adminUsersRouter.get('/users', protect, isAdmin, adminUsersController.getAllUsers); // Get all users
adminUsersRouter.post('/users', protect, isAdmin, adminUsersController.addNewUser); // Add new user
adminUsersRouter.put('/users/:id', protect, isAdmin, adminUsersController.updateUser); // Update user
adminUsersRouter.delete('/users/:id', protect, isAdmin, adminUsersController.deleteUser); // Delete user 

module.exports = adminUsersRouter;