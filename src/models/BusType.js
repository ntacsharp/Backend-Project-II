const mongoose = require("mongoose");

busTypeSchema = new mongoose.Schema({
    name: String,
    isDeleted: Boolean
})

module.exports = mongoose.model("BusType", busTypeSchema);