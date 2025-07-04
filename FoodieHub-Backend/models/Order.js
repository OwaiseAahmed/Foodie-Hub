// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
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
  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true
      },
      quantity: { type: Number, default: 1 }
    }
  ],
  totalAmount: Number,
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Preparing', 'Out for delivery', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  type: {
    type: String,
    enum: ['delivery', 'pickup'],
    default: 'delivery'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
