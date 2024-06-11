const mongoose = require("mongoose");

busTypeSchema = new mongoose.Schema({
    type: String,
    isDeleted: Boolean,
    seatCount: Number
})

module.exports = mongoose.model("BusType", busTypeSchema);