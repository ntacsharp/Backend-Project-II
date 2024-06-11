const mongoose = require("mongoose");

tripSchema = new mongoose.Schema({
    busTypeId: String,
    providerId: String,
    price: Number,
    isDeleted: Boolean
})

module.exports = mongoose.model("Trip", tripSchema);