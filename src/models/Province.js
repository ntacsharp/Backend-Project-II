const mongoose = require("mongoose");

const provinceSchema = new mongoose.Schema({
    name: String,
    isDeleted: Boolean
});

module.exports = mongoose.model("Province", provinceSchema);