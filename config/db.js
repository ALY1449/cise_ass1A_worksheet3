// db.js
const mongoose = require('mongoose'); // -> communicate with MongoDB
const config = require('config'); // -> global variable to run our project
const db = config.get('mongoURI'); // ->link

const connectDB = async () => {
  try {
    await mongoose.connect(
      db,
      {
        useNewUrlParser: true
      }
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;