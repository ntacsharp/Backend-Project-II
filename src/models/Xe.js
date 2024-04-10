const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

mongoose.Promise = global.Promise;

xeSchema = new mongoose.Schema({
    bienSoXe: {
        type: String,
        unique: true,
        required: true
    },
    loaiXe: {
        type: String
    },
    maNhaXe: {
        type: String,
        default: uuidv4,
        required: true,
        ref: "NhaXe",
    }
})

module.exports = mongoose.model("Xe", xeSchema);