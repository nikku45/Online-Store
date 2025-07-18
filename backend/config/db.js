require('dotenv').config();
const mongoose = require('mongoose');
const dbURI = process.env.DATABASE_URL ;



mongoose.connect(dbURI)
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));
module.exports = mongoose;