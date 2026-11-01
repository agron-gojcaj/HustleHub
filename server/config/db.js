const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI?.trim();
  if (!uri) {
    console.error('MongoDB connection failed: MONGO_URI is not set. Add your MongoDB connection string to server/.env.');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
