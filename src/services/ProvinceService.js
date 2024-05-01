const ProvinceModel = require("../models/Province");

const GetProvince = async () => {
    var resp = await ProvinceModel.find({
        // _id: "66181298626da1c3fbe71a5f"
        isDeleted: false
    }, "_id name")
        .then((allProvince) => {
            return resp = {
                success: true,
                items: allProvince,
                code: 200
            };
        })
        .catch((err) => {
            return resp = {
                success: false,
                errMsg: err.message,
                code: 500
            };
        });
    return resp;
    // return await ProvinceModel.find();
}

module.exports = {
    GetProvince
}