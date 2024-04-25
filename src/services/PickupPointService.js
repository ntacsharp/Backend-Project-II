const PickupPoint = require("../models/PickupPoint");

const GetPickupPoints = async (req) => {
    const id = req.params.id;
    const pickupPoints = PickupPoint.find({tripId: id});
    return resp = {
        success: true,
        items: pickupPoints
    };
}

module.exports = {
    GetPickupPoints
}