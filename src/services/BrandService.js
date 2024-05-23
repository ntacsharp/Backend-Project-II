const Brand = require("../models/Brand");
const BrandType = require("../models/BrandType");

const GetBrands = async (typeId) => {
    var resp = [];
    var brandTypes = await BrandType.find({busTypeId: typeId, isDeleted: false})
        .then((allTypes) => {
            allTypes.forEach(async (type) => {
                var brand = await Brand.findOne({_id: type._id});
                resp.push(brand);
            });
        });
    return resp;
}

module.exports = {
    GetBrands
}