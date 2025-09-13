const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


app.use('/healthcheck', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});
app.use('/api/daily', require('./routes/daily'));
app.use('/api/freeplay', require('./routes/freeplay'));
app.use('/api/user', require('./routes/user'));

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));