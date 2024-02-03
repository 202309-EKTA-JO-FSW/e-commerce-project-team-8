// models/customer.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  
  name: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  // Add a reference to the customer's cart
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
  },
  // Add a reference to the customer's orders
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order',
  }],
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
