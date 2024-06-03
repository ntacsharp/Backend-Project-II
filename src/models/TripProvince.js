const mongoose = require("mongoose");

tripProvinceSchema = new mongoose.Schema({
    tripId: String,
    provinceId: String,
    order: Number,
    isDeleted: Boolean
})

module.exports = mongoose.model("TripProvince", tripProvinceSchema);