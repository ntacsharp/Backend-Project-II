const mongoose = require("mongoose");
DropoffPointSchema = new mongoose.Schema({
    place: String,
    tripId: String,
    provinceId: String,
    time: Date
})

module.exports = mongoose.model("DropoffPoint", dropoffPointSchema);