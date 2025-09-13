const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

router.post('/create', async (req, res) => {
    console.log("Creating user");
    const userId = uuidv4();
    const newUser = new User({ id: userId, date: new Date().toISOString(), name: userId });
    await newUser.save();
    res.json({ user: newUser });
});

router.get('/id/:userId', async (req, res) => {
  const userId = req.params.userId;
  console.log("Fetching user:", userId);

const existing = await User.findOne({ id: userId });
  if (existing) {
    return res.json({ user: existing });
  }

  res.status(404).json({});
});

module.exports = router;