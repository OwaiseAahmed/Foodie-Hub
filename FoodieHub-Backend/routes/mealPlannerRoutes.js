// routes/mealPlannerRoutes.js
const express = require('express');
const router = express.Router();
const { buildMealPlan } = require('../controllers/mealPlannerController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, buildMealPlan);

module.exports = router;
