const mongoose = require("mongoose");
PickupPointSchema = new mongoose.Schema({
    place: String,
    tripId: String,
    provinceId: String,
    time: Date
})

module.exports = mongoose.model("PickupPoint", pickupPointSchema);