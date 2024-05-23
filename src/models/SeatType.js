const mongoose = require("mongoose");

seatTypeSchema = new mongoose.Schema({
    tripId: String,
    price: Number,
    setCount: Number,
    isDeleted: Boolean
})

module.exports = mongoose.model("SeatType", seatTypeSchema);