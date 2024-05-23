const mongoose = require("mongoose");

brandSchema = new mongoose.Schema({
    name: String,
    isDeleted: Boolean,
})

module.exports = mongoose.model("Brand", brandSchema);