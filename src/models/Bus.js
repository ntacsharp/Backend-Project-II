const mongoose = require("mongoose");

busSchema = new mongoose.Schema({
    plateNumber: {
        type: String,
        unique: true,
        required: true
    },
    providerId: String,
    busTypeId: String,
    isDeleted: Boolean
})

module.exports = mongoose.model("Bus", busSchema);