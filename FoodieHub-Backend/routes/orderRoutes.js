// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getMyOrders,
  updateOrderStatus
} = require('../controllers/orderController');

const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

// Customer places order
router.post('/', protect, authorizeRoles("customer"), placeOrder);

// Customer views own orders
router.get('/my-orders', protect, authorizeRoles("customer"), getMyOrders);

// Restaurant updates order status
router.patch('/:id/status', protect, authorizeRoles("restaurant"), updateOrderStatus);

module.exports = router;
