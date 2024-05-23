const mongoose = require("mongoose");

brandTypeSchema = new mongoose.Schema({
    brandId: String,
    busTypeId: String,
    isDeleted: Boolean,
})

module.exports = mongoose.model("BrandType", brandTypeSchema);