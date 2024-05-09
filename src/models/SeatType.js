const mongoose = require("mongoose");

seatTypeSchema = new mongoose.Schema({
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusType"
    },
    price: Number,
    setCount: Number,
    isDeleted: Boolean
})

module.exports = mongoose.model("SeatType", seatTypeSchema);