const mongoose = require("mongoose");

seatSchema = new mongoose.Schema({
    seatTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SeatType"
    },
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bus"
    },
    isDeleted: Boolean
})

module.exports = mongoose.model("Seat", seatSchema);