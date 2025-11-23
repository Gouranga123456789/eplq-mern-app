const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const mongoURI = "mongodb+srv://gourangakalita17_db_user:YMVVswd4DJbEt15F@cluster0.ritfqm3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
