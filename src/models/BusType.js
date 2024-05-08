const mongoose = require("mongoose");

busTypeSchema = new mongoose.Schema({
    name: String,
    seatCount: Number,
    isDeleted: Boolean
})

module.exports = mongoose.model("BusType", busTypeSchema);