const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    totalPrice: Number,
    isDeleted: Boolean
});

module.exports = mongoose.model("Ticket", ticketSchema);