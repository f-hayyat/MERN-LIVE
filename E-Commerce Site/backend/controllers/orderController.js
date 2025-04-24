const Order = require('../models/orderModel');

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.userId }).sort({ createdAt: -1 });
        if (!orders) {
            return res.status(404).json({ message: 'No orders found' });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get order by ID
exports.getOrderById = async (req, res) => {
    const orderId = req.params.id;
    try {
        const order = await Order.findById(orderId).populate('user', 'name email');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        };
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}