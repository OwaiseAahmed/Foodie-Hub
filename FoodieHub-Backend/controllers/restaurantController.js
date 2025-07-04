// controllers/restaurantController.js
const Restaurant = require('../models/Restaurant');

// Add restaurant (owner only)
exports.createRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.create({ ...req.body, owner: req.user._id });
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all restaurants (public)
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate("owner", "name email");
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one restaurant
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate("owner", "name email");
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update restaurant (owner only)
exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Not found" });

    if (restaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete restaurant (owner only)
exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Not found" });

    if (restaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await restaurant.deleteOne();
    res.json({ message: "Restaurant deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
