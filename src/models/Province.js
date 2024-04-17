const mongoose = require("mongoose");

const provinceSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model("Province", provinceSchema);