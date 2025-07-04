// routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const {
  createReservation,
  getMyReservations,
  getReservationsForRestaurant,
  updateReservationStatus
} = require('../controllers/reservationController');

const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

// Customer creates and views reservations
router.post('/', protect, authorizeRoles('customer'), createReservation);
router.get('/my-reservations', protect, authorizeRoles('customer'), getMyReservations);

// Restaurant manages reservations
router.get('/restaurant', protect, authorizeRoles('restaurant'), getReservationsForRestaurant);
router.patch('/:id/status', protect, authorizeRoles('restaurant'), updateReservationStatus);

module.exports = router;
