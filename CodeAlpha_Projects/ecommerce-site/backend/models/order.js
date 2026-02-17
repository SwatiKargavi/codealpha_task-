const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true } // Price at time of order
  }],
  total: { type: Number, required: true },
  status: { type: String, default: 'Pending' }, // e.g., Pending, Shipped
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);