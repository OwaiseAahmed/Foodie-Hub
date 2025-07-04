// models/Recipe.js
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: { type: String, required: true },
  ingredients: [String],
  instructions: String,
  image: String,
  cuisine: String,
  cookingTime: Number // in minutes
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
