const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip"
    },
    seatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seat"
    },
    totalPrice: Number,
    isDeleted: Boolean
});

module.exports = mongoose.model("Ticket", ticketSchema);