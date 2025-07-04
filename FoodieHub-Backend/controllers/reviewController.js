// controllers/reviewController.js
const Review = require('../models/Review');
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

exports.createReview = async (req, res) => {
  try {
    const { restaurant, rating, comment } = req.body;

    const existing = await Review.findOne({ user: req.user._id, restaurant });
    if (existing) return res.status(400).json({ message: 'You already reviewed this restaurant' });

    // Sentiment Analysis
    const result = sentiment.analyze(comment);
    let sentimentType = 'Neutral';
    if (result.score > 1) sentimentType = 'Positive';
    else if (result.score < -1) sentimentType = 'Negative';

    const newReview = await Review.create({
      user: req.user._id,
      restaurant,
      rating,
      comment,
      sentiment: sentimentType
    });

    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRestaurantReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ restaurant: req.params.restaurantId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
