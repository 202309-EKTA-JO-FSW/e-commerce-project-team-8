const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Customer } = require('../db/models');

const secret = 'b79e4d121619153b300093200eac261b027238e260aca638c03ba9157a4100183b6e6f751e9052d1cb2ccdf7ce2afcf9c44aa3dd0d058a2b76fa380507f3a1c2';

exports.signup = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const existingUser = await Customer.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Customer({ email, password: hashedPassword, role });

    await newUser.save();

    const token = jwt.sign({ _id: newUser._id, role }, secret);

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Customer.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, secret);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.signout = (req, res) => {
  res.status(200).json({ message: 'Signout successful' });
};
