// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();

const {
  createReview,
  getRestaurantReviews
} = require('../controllers/reviewController');

const { protect } = require('../middlewares/authMiddleware');

// ✅ Correct: `createReview` and `getRestaurantReviews` are proper functions
router.post('/', protect, createReview);
router.get('/:restaurantId', getRestaurantReviews);

module.exports = router;
