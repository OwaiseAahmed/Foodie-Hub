// controllers/menuController.js
const MenuItem = require('../models/MenuItem');

// Add menu item (restaurant only)
exports.addMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.create({ ...req.body, restaurant: req.user._id });
    res.status(201).json(menuItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get menu of a restaurant (public)
exports.getMenuByRestaurant = async (req, res) => {
  try {
    const items = await MenuItem.find({ restaurant: req.params.restaurantId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update menu item (restaurant only)
exports.updateMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    // Make sure the owner is updating their item
    if (item.restaurant.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete menu item (restaurant only)
exports.deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.restaurant.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await item.deleteOne();
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
