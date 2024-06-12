const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    email: String,
    address: {
        type: String,
        required: false
    },
    passwordHarsh: String,
    balance: Number,
    isDeleted: Boolean,
    isVerified: Boolean
});

module.exports = mongoose.model("Provider", providerSchema);