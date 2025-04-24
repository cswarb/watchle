// filepath: /Users/chrisswarbrick/git/watchle_full_project/backend/scripts/seedDailyChallenges.js
const mongoose = require('mongoose');
const Daily = require('../models/Daily');

mongoose.connect('mongodb://localhost:27017/watchle', { useNewUrlParser: true, useUnifiedTopology: true });

const seedChallenges = async () => {
  const challenges = [
    {
      date: '2025-04-24',
      imageSet: [
        '/images/watch1-zoom0.jpg',
        '/images/watch1-zoom1.jpg',
        '/images/watch1-zoom2.jpg',
        '/images/watch1-zoom3.jpg',
        '/images/watch1-zoom4.jpg'
      ],
      watchMake: 'Rolex',
      watchModel: 'Submariner'
    },
    {
      date: '2025-04-25',
      imageSet: [
        '/images/watch2-zoom0.jpg',
        '/images/watch2-zoom1.jpg',
        '/images/watch2-zoom2.jpg',
        '/images/watch2-zoom3.jpg',
        '/images/watch2-zoom4.jpg'
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