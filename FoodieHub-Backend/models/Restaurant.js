// models/Restaurant.js
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, required: true },
  address: String,
  description: String,
  phone: String,
  operatingHours: String,
  image: String,
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);
