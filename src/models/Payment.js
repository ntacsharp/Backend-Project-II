const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    ticketId: String,
    userId: String,
    isPaid: Boolean,
    isDeleted: Boolean
});

module.exports = mongoose.model("Payment", paymentSchema);