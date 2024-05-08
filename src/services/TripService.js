const mongoose = require("mongoose");
const Trip = require("../models/Trip");
const Bus = require("../models/Bus");
const Province = require("../models/Province");

const GetTrips = async (req) => {
    var allTrips = await Trip.find({
        departureProvinceId: req.body.departureProvinceId,
        arrivalProvinceId: req.body.arrivalProvinceId,
        isDeleted: false
    });
    if(req.body.departureTime) allTrips = allTrips.filter(a => a.departureTime.toLocaleDateString() == req.departureTime.toLocaleDateString());
    if(req.body.arrivalTime) allTrips = allTrips.filter(a => a.arrivalTime.toLocaleDateString() == req.arrivalTime.toLocaleDateString());
    return resp = {
        success: true,
        items: allTrips
    };
}

const CreateTrip = async (req) => {
    var foundBus = await Bus.findOne({_id: req.body.busId});
    if(!foundBus){
        return {
            success: false,
            message: "Không tồn tại xe buýt",
        };
    }
    var foundDepartureProvince = await Province.findOne({_id: req.body.departureProvinceId, isDeleted: false});
    var foundArrivalProvince = await Province.findOne({_id: req.body.arrivalProvinceId, isDeleted: false});
}

module.exports = {
    GetTrips
}