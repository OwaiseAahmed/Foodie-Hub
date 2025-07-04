// controllers/reservationController.js
const Reservation = require('../models/Reservation');

// Customer books a reservation
exports.createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create({
      ...req.body,
      customer: req.user._id
    });
    res.status(201).json(reservation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Customer views their reservations
exports.getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ customer: req.user._id })
      .populate('restaurant');
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Restaurant owner views reservations for their restaurant
exports.getReservationsForRestaurant = async (req, res) => {
  try {
    const reservations = await Reservation.find({ restaurant: req.user._id })
      .populate('customer');
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Restaurant owner updates reservation status
exports.updateReservationStatus = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Not found' });

    if (reservation.restaurant.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    reservation.status = req.body.status;
    await reservation.save();

    res.json({ message: 'Reservation status updated', reservation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
