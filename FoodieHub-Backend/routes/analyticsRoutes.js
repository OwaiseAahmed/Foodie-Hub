// routes/analyticsRoutes.js
const express = require('express');
const router = express.Router();
const { getRestaurantAnalytics } = require('../controllers/analyticsController');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

// Only restaurant owners or admins can view analytics
router.get('/:restaurantId', protect, authorizeRoles('restaurant', 'admin'), getRestaurantAnalytics);

module.exports = router;
