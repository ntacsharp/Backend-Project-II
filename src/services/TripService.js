const mongoose = require("mongoose");
const Trip = require("../models/Trip");

const GetTrip = async (req) => {
    var allTrip = await Trip.find({
        departureProvinceId: req.departureProvinceId,
        arrivalProvinceId: req.arrivalProvinceId,
    });
    if(req.departureTime != null) allTrip = allTrip.filter(a => a.departureTime.toLocaleDateString() == req.departureTime.toLocaleDateString());
    if(req.arrivalTime != null) allTrip = allTrip.filter(a => a.arrivalTime.toLocaleDateString() == req.arrivalTime.toLocaleDateString());
    
    return allTrip;
}

module.exports = {
    GetTrip
}