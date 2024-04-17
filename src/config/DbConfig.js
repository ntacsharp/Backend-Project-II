const mongoose = require("mongoose");

const connectToMongo = () => {
  const uri = process.env.MONGODB_URI;
  mongoose.connect(uri);

  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log("Database connection established successfully");
  })
};
module.exports = connectToMongo;