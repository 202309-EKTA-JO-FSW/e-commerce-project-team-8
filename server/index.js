const express = require("express");
const adminRouter = require("./routers/admin");
const cutomerRouter = require("./routers/cutomer");
require("dotenv").config();

const connectToMongo = require("./db/connection");

const app = express();
const port =
  process.env.NODE_ENV === "test"
    ? process.env.NODE_LOCAL_TEST_PORT
    : process.env.NODE_LOCAL_PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(adminRouter);
app.use(cutomerRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectToMongo();
});

module.exports = app;
