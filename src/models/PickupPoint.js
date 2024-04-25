const mongoose = require("mongoose");

pickupPointSchema = new mongoose.Schema({
    place: String,
    TripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip"
    }
})

module.exports = mongoose.model("PickupPoint", pickupPointSchema);