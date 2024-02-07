const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');

// Create a new order
router.post('/', isAuthenticated, async (req, res) => {
  const { customerId, items, totalPrice } = req.body;
  const customer = await Customer.findById(customerId);
  const newOrder = new Order({ customer, items, totalPrice });
  await newOrder.save();
  res.status(201).json(newOrder);
});

// Get all orders
router.get('/', isAdmin, async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
});

// Get a specific order
router.get('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
});

// Update order status
router.put('/:id/status', isAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
});

// Cancel order
router.delete('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByIdAndUpdate(id, { status: 'cancelled' }, { new: true });
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
});

module.exports = router;
