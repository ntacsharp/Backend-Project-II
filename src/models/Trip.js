const mongoose = require("mongoose");

tripSchema = new mongoose.Schema({
    busTypeId: String,
    departureTime: Date,
    arrivalTime: Date,
    departureProvinceId: String,
    arrivalProvinceId: String,
    isDeleted: Boolean
})

module.exports = mongoose.model("Trip", tripSchema);