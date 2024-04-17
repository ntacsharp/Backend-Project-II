const ProvinceModel = require("../models/Province");

exports.GetProvince = async () => {
    return await ProvinceModel.find();
}