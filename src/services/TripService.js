const mongoose = require("mongoose");
const Trip = require("../models/Trip");
const Provider = require("../models/Provider");
const Utility = require("../models/Utility");
const TripStopPoint = require("../models/TripStopPoints");
const BusType = require("../models/BusType");

const GetTrip = async (req) => {
    // var allTrips = await Trip.find({
    //     departureProvinceId: req.body.departureProvinceId,
    //     arrivalProvinceId: req.body.arrivalProvinceId,
    //     isDeleted: false
    // });
    // if (req.body.departureTime) {
    //     allTrips = allTrips.filter(trip => {
    //         const reqDepartureTime = new Date(req.body.departureTime);
    //         return trip.departureTime.getTime() === reqDepartureTime.getTime();
    //     });
    // }
    // if (req.body.arrivalTime){
    //     allTrips = allTrips.filter(trip => {
    //         const reqArrivalTime = new Date(req.body.arrivalTime);
    //         return trip.arrivalTime.getTime() === reqArrivalTime.getTime();
    //     });
    // }
    // return resp = {
    //     success: true,
    //     items: allTrips,
    //     code: 200
    // };
}

const CreateTrip = async (req) => {
    const id = req.body.info.id;
    var foundProvider = await Provider.findOne({ _id: id, isDeleted: false });
    if (!foundProvider) {
        return {
            success: false,
            message: "Chức năng chỉ dành cho nhà xe",
            code: 403
        }
    }
    var foundType = await BusType.findOne({ _id: req.body.busTypeId, isDeleted: false });
    if (!foundType) {
        return {
            success: false,
            message: "Loại xe không tồn tại",
            code: 400
        }
    }
    const newTrip = new Trip({
        busTypeId: req.body.busTypeId,
        providerId: id, 
        isDeleted: false
    });
    const trip = await Trip.create(newTrip);
    // req.body.stopPoints.forEach((stopPoint) => {
    //     const newTripStopPoint = new TripStopPoint({

    //     })
    // })
    return {
        success: true,
        message: "Thêm chuyến xe thành công",
        code: 200,
        item: trip
    };
}

module.exports = {
    GetTrip,
    CreateTrip
}