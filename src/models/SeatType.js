const mongoose = require("mongoose");

seatTypeSchema = new mongoose.Schema({
    busTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusType"
    },
    price: Number,
    isDeleted: Boolean
})

module.exports = mongoose.model("SeatType", seatTypeSchema);