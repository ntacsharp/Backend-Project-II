const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    email: String,
    passwordHarsh: String,
    isDeleted: Boolean
});

module.exports = mongoose.model("User", userSchema);