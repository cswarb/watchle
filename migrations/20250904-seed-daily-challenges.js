const mongoose = require('mongoose');
const Daily = require('../models/Daily');

module.exports = {
    async up() {
        mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

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

        for (const challenge of challenges) {
            await Daily.updateOne(
                { date: challenge.date }, // Match by date
                { $set: challenge }, // Update the document
                { upsert: true } // Insert if it doesn't exist
            );
        }

        console.log('Daily challenges seeded!');
        mongoose.connection.close();
    },

    async down() {
        mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        const dates = [
            '2025-09-4',
            '2025-09-5',
            '2025-09-6',
            '2025-09-7',
            '2025-09-8',
            '2025-09-9'
        ];

        await Daily.deleteMany({ date: { $in: dates } });
        console.log('Daily challenges removed!');
        mongoose.connection.close();
    }
};