const ProvinceModel = require("../models/Province");
const StopPoint = require("../models/StopPoint");

const GetProvince = async () => {
    var resp = await ProvinceModel.find({
        // _id: "66181298626da1c3fbe71a5f"
        isDeleted: false
    })
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

const GetStopPoint = async (req) => {
    var resp = await StopPoint.find({
        provinceId: req.params.id,
        isDeleted: false
    }).then((allStopPoint) => {
        return resp = {
            success: true,
            items: allStopPoint,
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
}

module.exports = {
    GetProvince,
    GetStopPoint
}