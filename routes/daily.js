const express = require('express');
const router = express.Router();
const Play = require('../models/Play');
const Daily = require('../models/Daily');
const { v4: uuidv4 } = require('uuid');

router.get('/', async (req, res) => {
  const today = new Date().toISOString().slice(0, 10); // Get today's date in "YYYY-MM-DD" format
  const challenge = await Daily.findOne({ date: today });

  if (!challenge) {
    return res.status(404).json({ message: 'No challenge for today.' });
  }

  res.json(challenge);
});

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
  const { userId, username, make, model, guesses, score, watchId } = req.body;
  const today = new Date().toISOString().split('T')[0];

  const resultId = uuidv4();

  const play = new Play({
    date: today,
    userId,
    username,
    make,
    model,
    guesses,
    score,
    resultId,
    watchId
  });

  await play.save();
  res.json({ message: 'Result saved', resultId });
});

router.get('/result/:resultId', async (req, res) => {
  const { resultId } = req.params;
  const play = await Play.findOne({ resultId });

  if (!play) return res.status(404).json({ message: 'Not found' });

  console.log(play.watchId);

  const dailyChallenge = await Daily.findOne({ date: play.watchId });
  if (!dailyChallenge) return res.status(404).json({ message: 'Daily challenge not found' });

  res.json({
    ...play.toObject(),
    imageSet: dailyChallenge.imageSet,
  });
});

router.get('/stats/leaderboard', async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const topPlayers = await Play.find({ date: today })
    .sort({ score: -1, guesses: 1 })
    .limit(10)
    .select('username score guesses make model');

  res.json(topPlayers);
});

module.exports = router;