const mongoose = require('mongoose');

const DailySchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // e.g., "2025-04-24"
  imageSet: [String], // Array of image URLs for the day
  watchMake: String, // The correct make of the watch
  watchModel: String // The correct model of the watch
});

module.exports = mongoose.model('Daily', DailySchema);