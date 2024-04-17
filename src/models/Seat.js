const mongoose = require("mongoose");

seatSchema = new mongoose.Schema({
    seatTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SeatType"
    },
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip"
    },
    IsFree: Boolean,
    isDeleted: Boolean
})

module.exports = mongoose.model("Seat", seatSchema);