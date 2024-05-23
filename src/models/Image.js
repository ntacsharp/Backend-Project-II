const mongoose = require("mongoose");
DropoffPointSchema = new mongoose.Schema({
    url: String,
    TripId: String,
})

module.exports = mongoose.model("DropoffPoint", dropoffPointSchema);