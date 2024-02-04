const express = require("express");
require("dotenv").config();


const connectToMongo = require("./db/connection");

// Import product routes
const productRoutes = require('./routes/productRoutes'); 

const app = express();
const port = process.env.NODE_ENV === "test"
    ? process.env.NODE_LOCAL_TEST_PORT
    : process.env.NODE_LOCAL_PORT;


app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/api', productRoutes);

const cartRoutes = require('./routes/cartRoutes'); 

app.use('/cart', cartRoutes);

const orderRoutes = require('./routes/orderRoutes'); 
app.use('/order', orderRoutes);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectToMongo(); 
});

module.exports = app;
