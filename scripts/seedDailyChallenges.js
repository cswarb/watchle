// filepath: /Users/chrisswarbrick/git/watchle_full_project/backend/scripts/seedDailyChallenges.js
const mongoose = require('mongoose');
const Daily = require('../models/Daily');

mongoose.connect('mongodb://127.0.0.1:27017/watchle', { useNewUrlParser: true, useUnifiedTopology: true });

const seedChallenges = async () => {
  const challenges = [
    {
      date: '2025-04-24',
      imageSet: [
        'zoom0.jpg',
        'zoom1.jpg',
        'zoom2.jpg',
        'zoom3.jpg',
        'zoom4.jpg'
      ],
      watchMake: 'Rolex',
      watchModel: 'Submariner'
    },
    {
      date: '2025-04-25',
      imageSet: [
        'zoom0.jpg',
        'zoom1.jpg',
        'zoom2.jpg',
        'zoom3.jpg',
        'zoom4.jpg'
      ],
      watchMake: 'Omega',
      watchModel: 'Seamaster'
    }
  ];

  await Daily.insertMany(challenges);
  console.log('Daily challenges seeded!');
  mongoose.connection.close();
};

seedChallenges();