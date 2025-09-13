const mongoose = require('mongoose');

const PlaySchema = new mongoose.Schema({
  date: { type: String, required: true },
  userId: { type: String, required: true },
  username: String,
  make: String,
  model: String,
  guesses: Number,
  score: Number,
  resultId: { type: String, unique: true },
  watchId: { type: String }
});

module.exports = mongoose.model('Play', PlaySchema);