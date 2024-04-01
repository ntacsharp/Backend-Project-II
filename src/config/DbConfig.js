const mongoose = require("mongoose");

const connectToMongo = async () => {
    try {
      mongoose.set("strictQuery", false);
      mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://it4409:it4409-soict@lamdb-crud.qd3s7vv.mongodb.net/?retryWrites=true&w=majority");
      console.log("Connected to Mongo Successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  module.exports = connectToMongo;