const mongoose = require("mongoose");
utilitySchema = new mongoose.Schema({
    icon: String,
    description: String,
    title: String,
    isDeleted: Boolean
})

module.exports = mongoose.model("Utility", utilitySchema);