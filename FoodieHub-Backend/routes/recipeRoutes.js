// routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
} = require('../controllers/recipeController');

const { protect } = require('../middlewares/authMiddleware');

// Public
router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);

// Protected routes for logged-in users
router.post('/', protect, createRecipe);
router.put('/:id', protect, updateRecipe);
router.delete('/:id', protect, deleteRecipe);

module.exports = router;
