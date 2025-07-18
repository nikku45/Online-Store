const Order = require('../models/Order');

// 📦 Place Order
exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user.userId; // comes from JWT middleware
    const { items, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    const order = new Order({
      items,
      total,
      user: userId
    });

    await order.save();

    const populatedOrder = await Order.findById(order._id)
      .populate('items.productId', 'name price image')
      .populate('user', 'name email');

    res.status(201).json(populatedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// 📋 Get all orders of logged-in user, sorted by most recent
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await Order.find({ user: userId })
      .populate('items.productId', 'name price image')
      .populate('user', 'name email')
      .sort({ createdAt: -1 }); // most recent first

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// 📋 Get order details by ID
exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId)
      .populate('items.productId', 'name price image')
      .populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
