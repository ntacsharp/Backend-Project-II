const mongoose = require("mongoose");

reviewSchema = new mongoose.Schema({
    tripId: String,
    userId: String,
    star: Number,
    comment: String,
    isDeleted: Boolean
})

module.exports = mongoose.model("Review", reviewSchema);