const mongoose = require("mongoose");
const Province = require("../models/Province");
const Service = require("../services/ProvinceService");

const GetProvince = async (req, res) => {
    console.log( await Service.GetProvince(req, res));
    return null;
}

module.exports = {
    GetProvince
}