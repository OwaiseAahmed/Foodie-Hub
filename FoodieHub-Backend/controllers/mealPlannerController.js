// controllers/mealPlannerController.js
const MenuItem = require('../models/MenuItem');

exports.buildMealPlan = async (req, res) => {
  try {
    const { dietType, maxPrepTime } = req.query;

    let filter = {};
    if (dietType) filter.dietType = dietType;
    if (maxPrepTime) filter.prepTime = { $lte: parseInt(maxPrepTime) };

    const items = await MenuItem.find(filter).populate('restaurant', 'name address');

    res.json({
      message: 'Meal plan generated',
      totalItems: items.length,
      items
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
