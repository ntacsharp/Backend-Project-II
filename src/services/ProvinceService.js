const mongoose = require("mongoose");
const Tinh = require("../models/Tinh");

const GetProvince = async (req, res) => {
    return Tinh.find()
        .select('id ten')
        .then((allProvince) => {
            return resp = {
                success: true,
                items: allProvince,
            };
        })
        .catch((err) => {
            return resp = {
                success: false,
                errMsg: err.message
            };
        })
}

module.exports = {
    GetProvince
}