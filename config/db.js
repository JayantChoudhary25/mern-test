const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('Current working directory:', process.cwd());

const connectDB = async () => {
  try {
    const dbUrl = process.env.NODE_ENV === 'production'
      ? 'mongodb://50.17.174.239:27017/'
      : process.env.MONGO_URI;

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 50000, // 5 seconds timeout
    };

    await mongoose.connect(dbUrl, options);

    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    // You can handle the error and take appropriate action here.
  }
};

module.exports = connectDB;
