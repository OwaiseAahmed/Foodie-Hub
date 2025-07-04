// controllers/supportController.js
const Support = require('../models/Support');

// User submits a ticket
exports.createSupportTicket = async (req, res) => {
  try {
    const ticket = await Support.create({
      ...req.body,
      user: req.user._id
    });
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// User views their tickets
exports.getMyTickets = async (req, res) => {
  try {
    const tickets = await Support.find({ user: req.user._id });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin views all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Support.find().populate('user', 'name email');
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin replies and updates status
exports.updateTicketStatus = async (req, res) => {
  try {
    const ticket = await Support.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    ticket.status = req.body.status || ticket.status;
    ticket.reply = req.body.reply || ticket.reply;
    await ticket.save();

    res.json({ message: 'Ticket updated', ticket });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
