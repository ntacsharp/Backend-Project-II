const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

mongoose.Promise = global.Promise;

chuyenXeSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true
    },
    maTinhDi: {
        type: String,
        default: uuidv4,
        required: true,
        ref: "Tinh"
    },
    maTinhDen: {
        type: String,
        default: uuidv4,
        required: true,
        ref: "Tinh"
    },
    bienSoXe: {
        type: String,
        required: true,
        ref: "Xe"
    },
    thoiGianDi: {
        type: Date,
        required: true
    },
    thoiGianDen: {
        type: Date,
        required: true
    }
})