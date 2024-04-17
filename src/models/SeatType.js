const mongoose = require("mongoose");

seatTypeSchema = new mongoose.Schema({
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider"
    },
    price: Number,
    isDeleted: Boolean
})

module.exports = mongoose.model("SeatType", seatTypeSchema);