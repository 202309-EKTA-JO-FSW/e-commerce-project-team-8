const Customer = require('../models/customer');

exports.getCustomerOrders = async (req, res) => {
  try {
    // Ensure that the request is coming from an authenticated customer
    if (!req.customer || !req.customer.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Retrieve the authenticated customer's orders
    const customer = await Customer.findById(req.customer.id).populate('orders');
    
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Return the customer's orders
    res.json(customer.orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// controllers/customer.js

exports.getCustomerProfile = async (req, res) => {
    try {
      // Retrieve the authenticated customer's profile
      const customer = await Customer.findById(req.customer.id);
  
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      // Return the customer's profile
      res.json(customer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  exports.updateCustomerProfile = async (req, res) => {
    try {
      // Update the authenticated customer's profile
      const updatedCustomer = await Customer.findByIdAndUpdate(
        req.customer.id,
        { $set: req.body },
        { new: true }
      );
  
      if (!updatedCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      // Return the updated customer's profile
      res.json(updatedCustomer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // controllers/customer.js

exports.getCustomerCart = async (req, res) => {
    try {
      // Retrieve the authenticated customer's cart
      const customer = await Customer.findById(req.customer.id).populate('cart');
  
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      // Return the customer's cart
      res.json(customer.cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  exports.addToCustomerCart = async (req, res) => {
    try {
      // Ensure that the request is coming from an authenticated customer
      if (!req.customer || !req.customer.id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      // Get the item details from the request body
      const { itemId, quantity } = req.body;
  
      // Retrieve the authenticated customer
      const customer = await Customer.findById(req.customer.id);
  
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      // Implement logic to find the shop item by ID and check if there is enough quantity
      // Then, add the item to the customer's cart with the specified quantity
      // Also, update the available count of the shop item
  
      // Save the updated customer document
      await customer.save();
  
      // Return the updated customer's cart
      res.json(customer.cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  
  
  exports.updateCustomerCart = async (req, res) => {
    try {
      // Ensure that the request is coming from an authenticated customer
      if (!req.customer || !req.customer.id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      // Get the updated cart details from the request body
      const updatedCart = req.body;
  
      // Retrieve the authenticated customer
      const customer = await Customer.findById(req.customer.id);
  
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      // Update the customer's cart with the new details
      customer.cart = updatedCart;
  
      // Save the updated customer document
      await customer.save();
  
      // Return the updated customer's cart
      res.json(customer.cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  
  
  exports.removeFromCustomerCart = async (req, res) => {
    try {
      // Ensure that the request is coming from an authenticated customer
      if (!req.customer || !req.customer.id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      // Get the item ID to be removed from the cart
      const itemIdToRemove = req.params.itemId;
  
      // Retrieve the authenticated customer
      const customer = await Customer.findById(req.customer.id);
  
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      // Find the index of the item to be removed in the customer's cart
      const itemIndex = customer.cart.findIndex(item => item.itemId === itemIdToRemove);
  
      // If the item is not found in the cart, return an error
      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found in the cart' });
      }
  
      // Remove the item from the cart
      customer.cart.splice(itemIndex, 1);
  
      // Save the updated customer document
      await customer.save();
  
      // Return the updated customer's cart
      res.json(customer.cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  