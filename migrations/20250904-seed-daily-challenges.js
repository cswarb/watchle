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
                    '1a.jpg',
                    '2a.jpg',
                    '3a.jpg',
                    '4a.jpg',
                    '5a.jpg'
                ],
                watchMake: 'Tudor',
                watchModel: 'Black Bay Chrono'
            },
            {
                date: '2025-09-6',
                imageSet: [
                    '1a.jpg',
                    '2a.jpg',
                    '3a.jpg',
                    '4a.jpg',
                    '5a.jpg'
                ],
                watchMake: 'Christopher Ward',
                watchModel: 'Sealander GMT'
            },
            {
                date: '2025-09-7',
                imageSet: [
                    '1a.jpg',
                    '2a.jpg',
                    '3a.jpg',
                    '4a.jpg',
                    '5a.jpg'
                ],
                watchMake: 'Tag Heuer',
                watchModel: 'Aquaracer'
            },
            {
                date: '2025-09-8',
                imageSet: [
                    '1a.jpg',
                    '2a.jpg',
                    '3a.jpg',
                    '4a.jpg',
                    '5a.jpg'
                ],
                watchMake: 'Vacheron Constantin',
                watchModel: 'Perpetual Calendar'
            },
            {
                date: '2025-09-9',
                imageSet: [
                    '1a.jpg',
                    '2a.jpg',
                    '3a.jpg',
                    '4a.jpg',
                    '5a.jpg'
                ],
                watchMake: 'Cartier',
                watchModel: 'Crash'
            },
            {
                date: '2025-09-10',
                imageSet: [
                    '1a.jpg',
                    '2a.jpg',
                    '3a.jpg',
                    '4a.jpg',
                    '5a.jpg'
                ],
                watchMake: 'MB&F',
                watchModel: 'hm8'
            },
            {
                date: '2025-09-11',
                imageSet: [
                    '1a.jpg',
                    '2a.jpg',
                    '3a.jpg',
                    '4a.jpg',
                    '5a.jpg'
                ],
                watchMake: 'Tag Heuer',
                watchModel: 'Chronograph'
            },
            {
                date: '2025-09-12',
                imageSet: [
                    '1a.jpg',
                    '2a.jpg',
                    '3a.jpg',
                    '4a.jpg',
                    '5a.jpg'
                ],
                watchMake: 'Omega',
                watchModel: 'Speedmaster'
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
            '2025-09-9',
            '2025-09-10',
            '2025-09-11',
            '2025-09-12'
        ];

        await Daily.deleteMany({ date: { $in: dates } });
        console.log('Daily challenges removed!');
        mongoose.connection.close();
    }
};