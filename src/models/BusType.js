const mongoose = require("mongoose");

busTypeSchema = new mongoose.Schema({
    type: String,
    isDeleted: Boolean,
})

module.exports = mongoose.model("BusType", busTypeSchema);