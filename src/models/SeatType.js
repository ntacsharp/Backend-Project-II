const mongoose = require("mongoose");

seatTypeSchema = new mongoose.Schema({
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusType"
    },
    type: String,
    price: Number,
    isDeleted: Boolean
})

module.exports = mongoose.model("SeatType", seatTypeSchema);