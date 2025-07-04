// routes/restaurantRoutes.js
const express = require('express');
const router = express.Router();
const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant
} = require('../controllers/restaurantController');

const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

// Public Routes
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);

// Protected (owner only)
router.post('/', protect, authorizeRoles("restaurant"), createRestaurant);
router.put('/:id', protect, authorizeRoles("restaurant"), updateRestaurant);
router.delete('/:id', protect, authorizeRoles("restaurant"), deleteRestaurant);

module.exports = router;
