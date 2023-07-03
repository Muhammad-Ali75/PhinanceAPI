require("dotenv").config();
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;

function dbConnect() {
  connectToDatabase()
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
}

const connectToDatabase = () => {
  return mongoose.connect(mongoString, {
    autoIndex: true,
  });
};

module.exports = dbConnect;
