const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const { isAuthenticated } = require('../middlewares/auth');

// Get the current customer's profile
router.get('/profile', isAuthenticated, async (req, res) => {
  const customer = await Customer.findById(req.user.id);
  res.json(customer);
});

// Update the current customer's profile
router.put('/profile', isAuthenticated, async (req, res) => {
  const updatedCustomer = await Customer.findByIdAndUpdate(
    req.user.id,
    req.body,
    { new: true }
  );
  res.json(updatedCustomer);
});

// Get all products of the current customer's cart
router.get('/cart', isAuthenticated, async (req, res) => {
  const customer = await Customer.findById(req.user.id);
  res.json(customer.cart);
});

// Add a product to the current customer's cart
router.post('/cart/add', isAuthenticated, async (req, res) => {
  const { productId, quantity } = req.body;
  const customer = await Customer.findById(req.user.id);
  const product = customer.cart.find((item) => item.product.toString() === productId);
  if (product) {
    product.quantity += quantity;
  } else {
    customer.cart.push({ product: productId, quantity });
  }
  await customer.save();
  res.json(customer.cart);
});

// Remove a product from the current customer's cart
router.delete('/cart/remove/:productId', isAuthenticated, async (req, res) => {
  const { productId } = req.params;
  const customer = await Customer.findById(req.user.id);
  const index = customer.cart.findIndex((item) => item.product.toString() === productId);
  if (index > -1) {
    customer.cart.splice(index, 1);
    await customer.save();
    res.json(customer.cart);
  } else {
    res.status(404).json({ message: 'Product not found in cart' });
  }
});

// Update the quantity of a product in the current customer's cart
router.put('/cart/update/:productId', isAuthenticated, async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const customer = await Customer.findById(req.user.id);
  const index = customer.cart.findIndex((item) => item.product.toString() === productId);
  if (index > -1) {
    customer.cart[index].quantity = quantity;
    await customer.save();
    res.json(customer.cart);
  } else {
    res.status(404).json({ message: 'Product not found in cart' });
  }
});

module.exports = router;