const mongoose = require('mongoose');
const dbURI = process.env.DATABASE_URL || 'mongodb://localhost:27017/OnlineStore';



mongoose.connect(dbURI)
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));
module.exports = mongoose;