const mongoose = require("mongoose");

tripSchema = new mongoose.Schema({
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bus"
    },
    departureTime: Date,
    arrivalTime: Date,
    departureProvinceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Province"
    },
    arrivalProvinceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Province"
    },
    isDeleted: Boolean
})

module.exports = mongoose.model("Trip", tripSchema);