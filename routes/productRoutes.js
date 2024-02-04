const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 

// GET /products: List all products with pagination and sorting
router.get('/products', async (req, res) => {
    const { page = 1, limit = 10, sort = 'title', order = 'asc' } = req.query;
    const skip = (page - 1) * limit;
    try {
        const products = await Product.find({})
            .sort({ [sort]: order === 'asc' ? 1 : -1 })
            .skip(skip)
            .limit(limit);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /products/:categoryId: List products by category
router.get('/products/:categoryId', async (req, res) => {
    const { categoryId } = req.params;
    try {
        const products = await Product.find({ category: categoryId });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /product/:productId: Get the details of a single product
router.get('/product/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
