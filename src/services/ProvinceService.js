const ProvinceModel = require("../models/Province");

const GetProvince = async () => {
    var resp = ProvinceModel.find({
        // _id: "66181298626da1c3fbe71a5f"
    }, "_id name")
        .then((allProvince) => {
            return resp = {
                success: true,
                items: allProvince
            };
        })
        .catch((err) => {
            return resp = {
                success: false,
                errMsg: err.message
            };
        });
    return resp;
    // return await ProvinceModel.find();
}

module.exports = {
    GetProvince
}