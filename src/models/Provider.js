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
    isDeleted: Boolean
});

module.exports = mongoose.model("Provider", providerSchema);