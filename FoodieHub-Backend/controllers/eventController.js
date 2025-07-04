// controllers/eventController.js
const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    const event = await Event.create({
      restaurant: req.user._id, // assuming restaurant is logged in
      title,
      description,
      date,
      location
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('restaurant', 'name');
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.rsvpEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Check if already RSVPed
    if (event.attendees.includes(req.user._id)) {
      return res.status(400).json({ message: 'You already RSVPed to this event' });
    }

    event.attendees.push(req.user._id);
    await event.save();

    res.json({ message: 'RSVP successful', event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserRSVPs = async (req, res) => {
  try {
    const events = await Event.find({ attendees: req.user._id });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
