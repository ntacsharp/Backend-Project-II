const mongoose = require("mongoose");

seatPositionSchema = new mongoose.Schema({
    busTypeId: String,
    xIndex: Number,
    yIndex: Number,
    isDeleted: Boolean
})

module.exports = mongoose.model("SeatPosition", seatPositionSchema);