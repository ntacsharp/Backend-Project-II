const mongoose = require("mongoose");

busSchema = new mongoose.Schema({
    plateNumber: {
        type: String,
        unique: true,
        required: true
    },
    type: String,
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider"
    }
})

module.exports = mongoose.model("Bus", busSchema);