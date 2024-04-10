const mongoose = require("mongoose");

const connectToMongo = async () => {
    try {
      mongoose.set("strictQuery", false);
      mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://admin:a12345678@cluster0.uriamhs.mongodb.net/");
      console.log("Connected to Mongo Successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  module.exports = connectToMongo;