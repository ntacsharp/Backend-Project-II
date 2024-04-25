const DropoffPoint = require("../models/DropoffPoint");

const GetDropoffPoints = async (req) => {
    const id = req.params.id;
    const dropoffPoints = DropoffPoint.find({tripId: id});
    return resp = {
        success: true,
        items: dropoffPoints
    };
}

module.exports = {
    GetDropoffPoints
}