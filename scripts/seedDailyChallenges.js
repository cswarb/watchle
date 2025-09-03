const mongoose = require('mongoose');
const Daily = require('../models/Daily');

mongoose.connect('mongodb://127.0.0.1:27017/watchle', { useNewUrlParser: true, useUnifiedTopology: true });

const seedChallenges = async () => {
  const challenges = [
    {
      date: '2025-09-4',
      imageSet: [
        '1a.jpg',
        '2a.jpg',
        '3a.jpg',
        '4a.jpg',
        '5a.jpg'
      ],
      watchMake: 'Audemars Piguet',
      watchModel: 'Grand Complication'
    },
    {
      date: '2025-09-5',
      imageSet: [
        '1b.jpg',
        '2b.jpg',
        '3b.jpg',
        '4b.jpg',
        '5b.jpg'
      ],
      watchMake: 'Tudor',
      watchModel: 'Black Bay Chrono'
    },
    {
      date: '2025-09-6',
      imageSet: [
        '1c.jpg',
        '2c.jpg',
        '3c.jpg',
        '4c.jpg',
        '5c.jpg'
      ],
      watchMake: 'Christopher Ward',
      watchModel: 'Sealander GMT'
    },
    {
      date: '2025-09-7',
      imageSet: [
        '1d.jpg',
        '2d.jpg',
        '3d.jpg',
        '4d.jpg',
        '5d.jpg'
      ],
      watchMake: 'Tag Heuer',
      watchModel: 'Aquaracer'
    },
    {
      date: '2025-09-8',
      imageSet: [
        '1e.jpg',
        '2e.jpg',
        '3e.jpg',
        '4e.jpg',
        '5e.jpg'
      ],
      watchMake: 'Vacheron Constantin',
      watchModel: 'Perpetual Calendar'
    },
    {
      date: '2025-09-9',
      imageSet: [
        '1f.jpg',
        '2f.jpg',
        '3f.jpg',
        '4f.jpg',
        '5f.jpg'
      ],
      watchMake: 'Cartier',
      watchModel: 'Crash'
    }
  ];

  await Daily.insertMany(challenges);
  console.log('Daily challenges seeded!');
  mongoose.connection.close();
};

seedChallenges();