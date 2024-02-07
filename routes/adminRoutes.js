const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { signup, signin, signout, isAuthenticated, isAdmin } = require('../auth');

router.post('/customer/signup', signup);
router.post('/customer/signin', signin);
router.get('/customer/signout', isAuthenticated, signout);
router.get('/customer/profile', isAuthenticated, async (req, res) => {
  try {
    const user = await Customer.findById(req.user._id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/admin/dashboard', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const admin = await Customer.findById(req.user._id);
    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;