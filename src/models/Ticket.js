const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    userId: String,
    tripId: String,
    date: Date,
    departurePointId: String,
    arrivalPointId: String,
    createdTime: Date,
    price: Number,
    seatCount: Number,
    isPaid: Boolean,
    isConfirmed: Boolean,
    isDeleted: Boolean
});

module.exports = mongoose.model("Ticket", ticketSchema);