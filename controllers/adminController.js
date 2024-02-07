const express = require('express');
const router = express.Router();
const { Customer, Product, Order } = require('../models');

// Admin dashboard page
router.get('/', isAuthenticated, isAdmin, async (req, res) => {
  const totalCustomers = await Customer.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();

  res.render('admin/dashboard', {
    title: 'Admin Dashboard',
    totalCustomers,
    totalProducts,
    totalOrders,
  });
});

// Admin customers page
router.get('/customers', isAuthenticated, isAdmin, async (req, res) => {
  const customers = await Customer.find({});

  res.render('admin/customers', {
    title: 'Customers',
    customers,
  });
});

// Admin orders page
router.get('/orders', isAuthenticated, isAdmin, async (req, res) => {
  const orders = await Order.find({})
    .populate('customer', 'name email')
    .populate('orderItems.product', 'title price');

  res.render('admin/orders', {
    title: 'Orders',
    orders,
  });
});

// Admin products page
router.get('/products', isAuthenticated, isAdmin, async (req, res) => {
  const products = await Product.find({});

  res.render('admin/products', {
    title: 'Products',
    products,
  });
});

// Admin add product page
router.get('/products/add', isAuthenticated, isAdmin, (req, res) => {
  res.render('admin/add-product', {
    title: 'Add Product',
  });
});

// Admin edit product page
router.get('/products/:id/edit', isAuthenticated, isAdmin, async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.render('admin/edit-product', {
    title: 'Edit Product',
    product,
  });
});

// Admin delete product page
router.get('/products/:id/delete', isAuthenticated, isAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  res.redirect('/admin/products');
});

module.exports = router;