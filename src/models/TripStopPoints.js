const mongoose = require("mongoose");

tripStopPointSchema = new mongoose.Schema({
    tripId: String,
    stopPointId: String,
    time: Date,
    isDeleted: Boolean
})

module.exports = mongoose.model("TripStopPoint", tripStopPointSchema);