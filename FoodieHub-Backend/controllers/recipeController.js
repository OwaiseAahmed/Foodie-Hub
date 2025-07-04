// controllers/recipeController.js
const Recipe = require('../models/Recipe');

// Create a recipe
exports.createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create({
      ...req.body,
      user: req.user._id
    });
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all recipes (public)
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('user', 'name email');
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single recipe
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('user', 'name email');
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update your recipe
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    if (recipe.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete your recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    if (recipe.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await recipe.deleteOne();
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
