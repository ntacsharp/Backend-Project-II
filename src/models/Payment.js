const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isPaid: Boolean,
    isDeleted: Boolean
});

module.exports = mongoose.model("Payment", paymentSchema);