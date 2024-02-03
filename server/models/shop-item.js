// models/shop-item.js

const mongoose = require('mongoose');

// Define the ShopItem schema
const shopItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
  availableCount: {
    type: Number,
    required: true,
    min: 0,
  },
  genre: {
    type: String, // or whatever type you choose
    required: true,
    trim: true,
  },
});

// Create the ShopItem model
const ShopItem = mongoose.model('ShopItem', shopItemSchema);

module.exports = ShopItem;
