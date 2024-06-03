const mongoose = require("mongoose");

stopPointSchema = new mongoose.Schema({
    name: String,
    address: String,
    provinceId: String,
    isDeleted: Boolean
})

module.exports = mongoose.model("StopPoint", stopPointSchema);