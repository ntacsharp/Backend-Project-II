const PickupPoint = require("../models/PickupPoint");

const GetPickupPoints = async (req) => {
    const id = req.params.id;
    const pickupPoints = await PickupPoint.find({tripId: id, isDeleted: false});
    return resp = {
        success: true,
        code: 200,
        items: pickupPoints
    };
}

module.exports = {
    GetPickupPoints
}