const mongoose = require("mongoose");
const NhaXe = require("../models/NhaXe");

const GetProvider = async (req, res) => {
    var resp = NhaXe.find()
                .select('id ten sdt email diachi')
                .then((allProvider) => {
                    return resp = {
                        success: true,
                        items: allProvider
                    };
                })
                .catch((err) => {
                    return resp = {
                        success: false,
                        errMsg: err.message
                    };
                });
    return resp;
}

module.exports = {
    GetProvider
}