// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  rsvpEvent,
  getUserRSVPs
} = require('../controllers/eventController');

const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

// Create an event (Restaurant/Owner only)
router.post('/', protect, authorizeRoles('restaurant'), createEvent);

// Get all events (public)
router.get('/', getAllEvents);

// RSVP to event
router.post('/rsvp/:eventId', protect, rsvpEvent);

// Get my RSVPs
router.get('/my-events', protect, getUserRSVPs);

module.exports = router;
