const mongoose = require("mongoose");

dropoffPointSchema = new mongoose.Schema({
    place: String,
    TripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip"
    }
})

module.exports = mongoose.model("DropoffPoint", dropoffPointSchema);