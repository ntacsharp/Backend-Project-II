const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

mongoose.Promise = global.Promise;

const provinceSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
})

module.exports = {
    provinceSchema
}