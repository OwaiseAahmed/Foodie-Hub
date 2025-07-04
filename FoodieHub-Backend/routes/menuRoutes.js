// routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const {
  addMenuItem,
  getMenuByRestaurant,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/menuController');

const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

// Public route: View menu
router.get('/:restaurantId', getMenuByRestaurant);

// Protected routes: Restaurant access
router.post('/', protect, authorizeRoles("restaurant"), addMenuItem);
router.put('/:id', protect, authorizeRoles("restaurant"), updateMenuItem);
router.delete('/:id', protect, authorizeRoles("restaurant"), deleteMenuItem);

module.exports = router;
