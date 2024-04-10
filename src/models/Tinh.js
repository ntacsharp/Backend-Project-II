const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

mongoose.Promise = global.Promise;

const tinhSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true
    },
    ten: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Tinh', tinhSchema);