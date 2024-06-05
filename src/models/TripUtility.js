const mongoose = require("mongoose");

tripUtilitySchema = new mongoose.Schema({
    tripId: String,
    utilityId: String,
    isDeleted: Boolean
})

module.exports = mongoose.model("TripUtility", tripUtilitySchema);