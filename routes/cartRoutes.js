const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Get all carts
router.get('/', async (req, res) => {
  const carts = await Cart.find({});
  res.json(carts);
});

// Get a specific cart by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const cart = await Cart.findById(id);
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }
  res.json(cart);
});

// Create a new cart
router.post('/', async (req, res) => {
  const newCart = new Cart(req.body);
  await newCart.save();
  res.status(201).json(newCart);
});

// Update a cart by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedCart = await Cart.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedCart) {
    return res.status(404).json({ message: 'Cart not found' });
  }
  res.json(updatedCart);
});

// Delete a cart by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedCart = await Cart.findByIdAndDelete(id);
  if (!deletedCart) {
    return res.status(404).json({ message: 'Cart not found' });
  }
  res.json(deletedCart);
});

module.exports = router;