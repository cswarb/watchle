const express = require('express');
const router = express.Router();
const Play = require('../models/Play');
const { v4: uuidv4 } = require('uuid');

router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const today = new Date().toISOString().split('T')[0];

  const existing = await Play.findOne({ userId, date: today });
  if (existing) {
    return res.json({ played: true, resultId: existing.resultId, score: existing.score });
  }

  res.json({ played: false });
});

router.post('/', async (req, res) => {
  const { userId, username, make, model, guesses, score } = req.body;
  const today = new Date().toISOString().split('T')[0];

  const existing = await Play.findOne({ userId, date: today });
  if (existing) {
    return res.status(400).json({ message: 'Already played today' });
  }

  const resultId = uuidv4();

  const play = new Play({
    date: today,
    userId,
    username,
    make,
    model,
    guesses,
    score,
    resultId
  });

  await play.save();
  res.json({ message: 'Result saved', resultId });
});

router.get('/result/:resultId', async (req, res) => {
  const { resultId } = req.params;
  const play = await Play.findOne({ resultId });

  if (!play) return res.status(404).json({ message: 'Not found' });

  res.json(play);
});

router.get('/leaderboard', async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const topPlayers = await Play.find({ date: today })
    .sort({ score: -1, guesses: 1 })
    .limit(10)
    .select('username score guesses make model');

  res.json(topPlayers);
});

module.exports = router;