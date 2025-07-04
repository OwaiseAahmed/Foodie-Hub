// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  location: String,
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
