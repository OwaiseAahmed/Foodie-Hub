// controllers/orderController.js
const Order = require('../models/Order');

// Place a new order (customer)
exports.placeOrder = async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      customer: req.user._id
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get customer's own orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id })
      .populate('items.menuItem')
      .populate('restaurant');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update order status (restaurant only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (order.restaurant.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this order' });
    }

    order.status = req.body.status;
    await order.save();
    res.json({ message: 'Status updated', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
