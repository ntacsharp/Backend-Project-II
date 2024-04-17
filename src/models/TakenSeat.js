const mongoose = require("mongoose");

takenSeatSchema = new mongoose.Schema({
    seatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SeatType"
    },
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
    },
    isDeleted: Boolean
})

module.exports = mongoose.model("TakenSeat", takenSeatSchema);