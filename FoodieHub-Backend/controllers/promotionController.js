// controllers/promotionController.js
const Promotion = require('../models/Promotion');

// Create promotion (restaurant)
exports.createPromotion = async (req, res) => {
  try {
    const promo = await Promotion.create({
      ...req.body,
      createdBy: req.user._id
    });
    res.status(201).json(promo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get active promotions (customer)
exports.getPromotions = async (req, res) => {
  try {
    const now = new Date();
    const promos = await Promotion.find({
      isActive: true,
      $or: [{ expiresAt: { $gte: now } }, { expiresAt: null }]
    });
    res.json(promos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Disable promotion (restaurant)
exports.disablePromotion = async (req, res) => {
  try {
    const promo = await Promotion.findById(req.params.id);
    if (!promo) return res.status(404).json({ message: 'Not found' });

    if (promo.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    promo.isActive = false;
    await promo.save();
    res.json({ message: 'Promotion disabled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
