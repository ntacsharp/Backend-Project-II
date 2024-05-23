const mongoose = require("mongoose");

seatPositionSchema = new mongoose.Schema({
    busTypeId: String,
    xIndex: Number,
    yIndex: Number
})

module.exports = mongoose.model("SeatPosition", seatPositionSchema);