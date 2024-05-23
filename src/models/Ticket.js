const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    tripId: String,
    seatId: String,
    price: Number,
    date: Number,
    createdTime: Number,
    isDeleted: Boolean
});

module.exports = mongoose.model("Ticket", ticketSchema);