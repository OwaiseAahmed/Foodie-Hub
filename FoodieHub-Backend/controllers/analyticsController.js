// controllers/analyticsController.js
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

exports.getRestaurantAnalytics = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;

    const totalOrders = await Order.countDocuments({ restaurant: restaurantId });

    const totalRevenueData = await Order.aggregate([
      { $match: { restaurant: restaurantId } },
      { $group: { _id: null, revenue: { $sum: '$totalPrice' } } }
    ]);
    const totalRevenue = totalRevenueData[0]?.revenue || 0;

    const uniqueCustomers = await Order.distinct('user', { restaurant: restaurantId });

    const topItems = await Order.aggregate([
      { $match: { restaurant: restaurantId } },
      { $group: { _id: '$menuItem', totalOrders: { $sum: 1 } } },
      { $sort: { totalOrders: -1 } },
      { $limit: 3 },
      {
        $lookup: {
          from: 'menuitems',
          localField: '_id',
          foreignField: '_id',
          as: 'itemDetails'
        }
      },
      { $unwind: '$itemDetails' },
      {
        $project: {
          name: '$itemDetails.name',
          totalOrders: 1
        }
      }
    ]);

    res.json({
      totalOrders,
      totalRevenue,
      uniqueCustomers: uniqueCustomers.length,
      topItems
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
