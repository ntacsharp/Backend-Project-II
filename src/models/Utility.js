const mongoose = require("mongoose");
utilitySchema = new mongoose.Schema({
    icon: String,
    description: String,
    title: String
})

module.exports = mongoose.model("Utility", utilitySchema);