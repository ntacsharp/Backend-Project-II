const Brand = require("../models/Brand");
const BrandType = require("../models/BrandType");

const GetBrand = async (typeId) => {
    var resp = [];
    var brandTypes = await BrandType.find({busTypeId: typeId, isDeleted: false})
        .then((allTypes) => {
            const tPromises = allTypes.map(async (type) => {
                var brand = await Brand.findOne({_id: type._id});
                resp.push(brand);
            });
            Promise.all(tPromises);
        });
    return resp;
}

module.exports = {
    GetBrand
}