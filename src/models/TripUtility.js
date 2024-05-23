const mongoose = require("mongoose");

TripUtilitySchema = new mongoose.Schema({
    tripId: String,
    utilityId: String,
    isDeleted: Boolean
})

module.exports = mongoose.model("TripUtility", tripUtilitySchema);