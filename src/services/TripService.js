const mongoose = require("mongoose");
const Trip = require("../models/Trip");
const Bus = require("../models/Bus");
const Province = require("../models/Province");
const Provider = require("../models/Provider");

const GetTrips = async (req) => {
    var allTrips = await Trip.find({
        departureProvinceId: req.body.departureProvinceId,
        arrivalProvinceId: req.body.arrivalProvinceId,
        isDeleted: false
    });
    if (req.body.departureTime) {
        allTrips = allTrips.filter(trip => {
            const reqDepartureTime = new Date(req.body.departureTime);
            return trip.departureTime.getTime() === reqDepartureTime.getTime();
        });
    }
    if (req.body.arrivalTime){
        allTrips = allTrips.filter(trip => {
            const reqArrivalTime = new Date(req.body.arrivalTime);
            return trip.arrivalTime.getTime() === reqArrivalTime.getTime();
        });
    }
    return resp = {
        success: true,
        items: allTrips,
        code: 200
    };
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
    var foundBus = await Bus.findOne({ _id: req.body.busId, providerId: id });
    if (!foundBus) {
        return {
            success: false,
            message: "Không tồn tại xe buýt",
            code: 400
        };
    }
    var foundDepartureProvince = await Province.findOne({ _id: req.body.departureProvinceId });
    var foundArrivalProvince = await Province.findOne({ _id: req.body.arrivalProvinceId });
    if (!foundArrivalProvince || !foundDepartureProvince) {
        return {
            success: false,
            message: "Tỉnh không hợp lệ",
            code: 400
        }
    }
    var dTime = new Date(req.body.departureTime);
    var aTime = new Date(req.body.arrivalTime);
    const newTrip = new Trip({
        busId: foundBus._id,
        departureProvinceId: foundDepartureProvince._id,
        arrivalProvinceId: foundArrivalProvince._id,
        departureTime: dTime,
        arrivalTime: aTime,
        isDeleted: false
    });
    const trip = await Trip.create(newTrip);
    return {
        success: true,
        message: "Thêm chuyến xe thành công",
        code: 200,
        item: trip
    };
}

module.exports = {
    GetTrips,
    CreateTrip
}