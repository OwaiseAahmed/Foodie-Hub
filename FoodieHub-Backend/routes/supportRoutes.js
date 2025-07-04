// routes/supportRoutes.js
const express = require('express');
const router = express.Router();
const {
  createSupportTicket,
  getMyTickets,
  getAllTickets,
  updateTicketStatus
} = require('../controllers/supportController');

const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

// All users
router.post('/', protect, createSupportTicket);
router.get('/my', protect, getMyTickets);

// Admin-only
router.get('/', protect, authorizeRoles('admin'), getAllTickets);
router.patch('/:id', protect, authorizeRoles('admin'), updateTicketStatus);

module.exports = router;
