// models/Reservation.js
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  date: { type: String, required: true },
  time: { type: String, required: true },
  partySize: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
