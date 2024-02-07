const Customer = require('../models/Customer');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
  try {
    const customerId = req.customer._id;
    const productId = req.body.productId;
    const quantity = req.body.quantity || 1;

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if enough quantity is available
    if (product.availableCount < quantity) {
      return res.status(400).json({ message: 'Not enough quantity available' });
    }

    // Add product to cart
    customer.cart.push({ productId, quantity });
    await customer.save();

    res.status(201).json({ message: 'Product added to cart successfully', customer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const customerId = req.customer._id;
    const productId = req.params.productId;

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Remove product from cart
    customer.cart = customer.cart.filter(item => item.productId.toString() !== productId);
    await customer.save();

    res.json({ message: 'Product removed from cart successfully', customer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
