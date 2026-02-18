const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Adding these options helps prevent the 10000ms timeout
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000 
    });
    console.log("🚀 DATABASE CONNECTED SUCCESSFULLY!");
  } catch (err) {
    console.error("❌ DATABASE CONNECTION ERROR:", err.message);
  }
};

module.exports = connectDB; 