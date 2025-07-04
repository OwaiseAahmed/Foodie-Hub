// routes/promotionRoutes.js
const express = require('express');
const router = express.Router();
const {
  createPromotion,
  getPromotions,
  disablePromotion
} = require('../controllers/promotionController');

const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

// Restaurant creates, disables promotions
router.post('/', protect, authorizeRoles('restaurant'), createPromotion);
router.patch('/:id/disable', protect, authorizeRoles('restaurant'), disablePromotion);

// Customer can view all active promotions
router.get('/', protect, authorizeRoles('customer'), getPromotions);

module.exports = router;
