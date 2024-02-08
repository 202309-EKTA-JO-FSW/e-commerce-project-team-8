const express = require("express");
const Admin = require("../models/admin");

const router = new express.Router();

router.post("/admin", async (req, res) => {
  const user = new Admin(req.body);
  try {
    await user.save();
    // const token = await user.generateAuthToken()
    // return res.status(201).send({user, token})
    return res.status(201).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
});
