const mongoose = require("mongoose");

busSchema = new mongoose.Schema({
    plateNumber: {
        type: String,
        unique: true,
        required: true
    },
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider"
    },
    busTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusType"
    },
    isDeleted: Boolean
})

module.exports = mongoose.model("Bus", busSchema);