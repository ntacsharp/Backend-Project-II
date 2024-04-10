const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

mongoose.Promise = global.Promise;

const nhaXeSchema = new mongoose.Schema({
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
    sdt: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    diachi: {
        type: String,
        required: false
    },
    taikhoan: {
        type: String,
        required: true
    },
    // passwordHarsh: {
    //     type: String,
    //     required: true
    // },
    // harshKey: {
    //     type: 
    // }
})

module.exports = mongoose.model('NhaXe', nhaXeSchema);