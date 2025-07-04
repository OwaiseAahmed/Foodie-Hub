// models/Promotion.js
const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['referral', 'loyalty', 'time-limited', 'custom'],
    required: true
  },
  code: String,
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  discountPercent: { type: Number, default: 0 },
  expiresAt: Date,
  minOrders: Number, // for loyalty
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Promotion', promotionSchema);
