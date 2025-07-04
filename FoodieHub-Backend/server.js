// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const supportRoutes = require('./routes/supportRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const promotionRoutes = require('./routes/promotionRoutes');
const mealPlannerRoutes = require('./routes/mealPlannerRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const eventRoutes = require('./routes/eventRoutes'); // ✅ NEW

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/meal-planner', mealPlannerRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/events', eventRoutes); // ✅ NEW

// Root
app.get('/', (req, res) => {
  res.send('Welcome to FoodieHub API!');
});

// MongoDB Connect
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.log('❌ MongoDB error:', err.message);
    process.exit(1);
  }
};
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
