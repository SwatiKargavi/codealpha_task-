const express = require('express');
const Order = require('../models/order');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = express.Router();

// Get user orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('products.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Place order
router.post('/place', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.productId');
    const products = user.cart.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price
    }));
    const total = products.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = new Order({ userId: req.user.id, products, total });
    await order.save();
    user.cart = []; // Clear cart
    await user.save();
    res.json({ message: 'Order placed', orderId: order._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;