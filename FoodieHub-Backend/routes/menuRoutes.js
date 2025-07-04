// routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const {
  addMenuItem,
  getMenuByRestaurant,
  getAllMenuItems, // ✅ NEW
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/menuController');

const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

// Public routes
router.get('/', getAllMenuItems); // ✅ GET /api/menu
router.get('/:restaurantId', getMenuByRestaurant); // ✅ GET /api/menu/:restaurantId

// Protected routes: Restaurant-only
router.post('/', protect, authorizeRoles("restaurant"), addMenuItem);
router.put('/:id', protect, authorizeRoles("restaurant"), updateMenuItem);
router.delete('/:id', protect, authorizeRoles("restaurant"), deleteMenuItem);

module.exports = router;
