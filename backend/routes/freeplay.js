const express = require('express');
const router = express.Router();
const Daily = require('../models/Daily');

// Fetch all watches
router.get('/watches', async (req, res) => {
    try {
        const watches = await Daily.find().select('date imageSet watchMake watchModel');
        res.json(watches);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching watches', error: err.message });
    }
});

module.exports = router;