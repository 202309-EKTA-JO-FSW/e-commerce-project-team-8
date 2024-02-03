exports.checkout = async (req, res) => {
  try {
    const customerId = req.customer._id;
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const orderItems = await Promise.all(
      customer.cart.map(async ({ productId, quantity }) => {
        const product = await Product.findById(productId);
        return {
          productId,
          quantity,
          price: product.price,
        };
      })
    );

    const total = orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    const order = new Order({
      customerId,
      orderItems,
      total,
    });

    customer.cart = [];
    await Promise.all([customer.save(), order.save()]);

    res.json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
