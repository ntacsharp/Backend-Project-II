const DropoffPoint = require("../models/DropoffPoint");

const GetDropoffPoints = async (req) => {
    const id = req.params.id;
    const dropoffPoints = DropoffPoint.find({tripId: id, isDeleted: false});
    return resp = {
        success: true,
        code: 200,
        items: dropoffPoints
    };
}

module.exports = {
    GetDropoffPoints
}