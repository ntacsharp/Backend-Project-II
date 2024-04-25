const mongoose = require("mongoose");
const Trip = require("../models/Trip");

const GetTrips = async (req) => {
    var allTrips = await Trip.find({
        departureProvinceId: req.body.departureProvinceId,
        arrivalProvinceId: req.body.arrivalProvinceId,
    });
    if(req.body.departureTime) allTrips = allTrips.filter(a => a.departureTime.toLocaleDateString() == req.departureTime.toLocaleDateString());
    if(req.body.arrivalTime) allTrips = allTrips.filter(a => a.arrivalTime.toLocaleDateString() == req.arrivalTime.toLocaleDateString());
    return resp = {
        success: true,
        items: allTrips
    };
}

module.exports = {
    GetTrips
}