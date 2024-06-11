const mongoose = require("mongoose");
const Trip = require("../models/Trip");
const Provider = require("../models/Provider");
const Utility = require("../models/Utility");
const TripStopPoint = require("../models/TripStopPoint");
const BusType = require("../models/BusType");
const StopPoint = require("../models/StopPoint");
const Province = require("../models/Province");
const TripProvince = require("../models/TripProvince");
const TripUtility = require("../models/TripUtility");
const TimeService = require("./TimeService");

const GetUtility = async () => {
    var resp = await Utility.find({ isDeleted: false })
        .then((allUtility) => {
            return resp = {
                success: true,
                items: allUtility,
                code: 200
            };
        })
        .catch((err) => {
            return resp = {
                success: false,
                errMsg: err.message,
                code: 500
            };
        });
    return resp;
}

const GetTrip = async (req) => {
    const foundDepartureProvince = await Province.findOne({ _id: req.body.departureProvinceId, isDeleted: false });
    if (!foundDepartureProvince) {
        return {
            success: false,
            message: "Tỉnh không tồn tại",
            code: 400
        }
    }
    const foundArrivalProvince = await Province.findOne({ _id: req.body.arrivalProvinceId, isDeleted: false });
    if (!foundArrivalProvince) {
        return {
            success: false,
            message: "Tỉnh không tồn tại",
            code: 400
        }
    }
    var allTripIds = [];
    var resp = [];
    const foundDepartureTripProvince = await TripProvince.find({ provinceId: req.body.departureProvinceId, isDeleted: false });
    if (foundDepartureTripProvince && foundDepartureTripProvince.length > 0) {
        const dtpPromises = foundDepartureTripProvince.map(async (dtp) => {
            const foundArrivalTripProvince = await TripProvince.findOne({ provinceId: req.body.arrivalProvinceId, tripId: dtp.tripId, order: { $gt: dtp.order }, isDeleted: false });
            if (foundArrivalTripProvince) {
                allTripIds.push(dtp.tripId);
            }
        });
        await Promise.all(dtpPromises);
    }
    const tPromises = allTripIds.map(async (tripId) => {
        const trip = await Trip.findOne({ _id: tripId, isDeleted: false });
        const busType = await BusType.findOne({ _id: trip.busTypeId, isDeleted: false });
        const provider = await Provider.findOne({ _id: trip.providerId, isDeleted: false });
        const tripStopPoints = await TripStopPoint.find({ tripId: tripId, isDeleted: false });
        if (trip && busType && provider) {
            var departurePoints = [], arrivalPoints = [];
            const sptPromises = tripStopPoints.map(async (tsp) => {
                const sp = await StopPoint.findOne({ _id: tsp.stopPointId, isDeleted: false });
                if (sp.provinceId == req.body.departureProvinceId) {
                    var spDTO = {
                        id: tsp._id,
                        address: sp.name + " (" + sp.address + ")",
                        time: TimeService.combineDateTime(req.body.departureTime, tsp.time)
                    };
                    departurePoints.push(spDTO);
                }
                if (sp.provinceId == req.body.arrivalProvinceId) {
                    var spDTO = {
                        id: tsp._id,
                        address: sp.name + " (" + sp.address + ")",
                        time: TimeService.combineDateTime(req.body.departureTime, tsp.time)
                    };
                    arrivalPoints.push(spDTO);
                }
            })
            await Promise.all(sptPromises);
            const utilities = await TripUtility.find({ tripId: tripId, isDeleted: false });
            const uList = [];
            const uPromises = await utilities.map(async (utility) => {
                const foundUtility = await Utility.findOne({ _id: utility.utilityId });
                if (foundUtility) {
                    var uDTO = {
                        icon: foundUtility.icon,
                        description: foundUtility.description,
                        title: foundUtility.title,
                    };
                    uList.push(uDTO);
                }
            })
            await Promise.all(uPromises);
            const tripDTO = {
                id: trip._id,
                busType: busType.type,
                provider: provider.name,
                departureProvince: foundDepartureProvince.name,
                arrivalProvince: foundArrivalProvince.name,
                departurePoints: departurePoints,
                arrivalPoints: arrivalPoints,
                utilities: uList,
                price: trip.price
            };
            resp.push(tripDTO);
        }
    });
    await Promise.all(tPromises);
    return {
        success: true,
        items: resp,
        code: 200
    }
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
    const spPromises = req.body.stopPoints.map(async (stopPoint) => {
        var foundPoint = await StopPoint.findOne({ _id: stopPoint.stopPointId, isDeleted: false });
        if (!foundPoint) {
            return {
                success: false,
                message: "Điểm dừng không tồn tại",
                code: 400
            }
        }
    })
    Promise.all(spPromises);
    const uPromises = req.body.utilities.map(async (utilityId) => {
        const foundUtility = await Utility.findOne({ _id: utilityId, isDeleted: false });
        if (!foundUtility) {
            return {
                success: false,
                message: "Tiện ích không tồn tại",
                code: 400
            }
        }
    })
    Promise.all(uPromises);
    const newTrip = new Trip({
        busTypeId: req.body.busTypeId,
        providerId: id,
        isDeleted: false
    });
    const trip = await Trip.create(newTrip);
    var stopPointOrder = 1;
    var lastProvinceId = "";
    var provinceOrder = 1;
    const nspPromises = req.body.stopPoints.map(async (stopPoint) => {
        const newTripStopPoint = new TripStopPoint({
            tripId: trip._id,
            stopPointId: stopPoint.stopPointId,
            time: stopPoint.time,
            order: stopPointOrder,
            isDeleted: false
        });
        stopPointOrder = stopPointOrder + 1;
        var foundPoint = await StopPoint.findOne({ _id: stopPoint.stopPointId, isDeleted: false });
        if (foundPoint.provinceId != lastProvinceId) {
            const newTripProvince = new TripProvince({
                tripId: trip._id,
                provinceId: foundPoint.provinceId,
                order: provinceOrder,
                isDeleted: false
            });
            lastProvinceId = foundPoint.provinceId;
            provinceOrder = provinceOrder + 1;
            await TripProvince.create(newTripProvince);
        }
        await TripStopPoint.create(newTripStopPoint);
    })
    Promise.all(nspPromises);
    const nuPromises = req.body.utilities.map(async (utilityId) => {
        const newTripUtility = new TripUtility({
            tripId: trip._id,
            utilityId: utilityId,
            isDeleted: false
        });
        await TripUtility.create(newTripUtility);
    })
    Promise.all(nuPromises);
    return {
        success: true,
        message: "Thêm chuyến xe thành công",
        code: 200,
        item: trip
    };
}

const CreateMultipleTrip = async (req) => {
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
    const spPromises = req.body.stopPoints.map(async (stopPoint) => {
        var foundPoint = await StopPoint.findOne({ _id: stopPoint.stopPointId, isDeleted: false });
        if (!foundPoint) {
            return {
                success: false,
                message: "Điểm dừng không tồn tại",
                code: 400
            }
        }
    })
    Promise.all(spPromises);
    const uPromises = req.body.utilities.map(async (utilityId) => {
        const foundUtility = await Utility.findOne({ _id: utilityId, isDeleted: false });
        if (!foundUtility) {
            return {
                success: false,
                message: "Tiện ích không tồn tại",
                code: 400
            }
        }
    })
    Promise.all(uPromises);
    var tmp = new Date();
    while (true) {
        if (tmp.getUTCHours() > 22) {
            break;
        }
        const newTrip = new Trip({
            busTypeId: req.body.busTypeId,
            providerId: id,
            isDeleted: false
        });
        const trip = await Trip.create(newTrip);
        var stopPointOrder = 1;
        var lastProvinceId = "";
        var provinceOrder = 1;
        const nspPromises = req.body.stopPoints.map(async (stopPoint) => {
            tmp = new Date(stopPoint.time);
            const newTripStopPoint = new TripStopPoint({
                tripId: trip._id,
                stopPointId: stopPoint.stopPointId,
                time: stopPoint.time,
                order: stopPointOrder,
                isDeleted: false
            });
            stopPoint.time = TimeService.addHour(tmp, 1);
            stopPointOrder = stopPointOrder + 1;
            var foundPoint = await StopPoint.findOne({ _id: stopPoint.stopPointId, isDeleted: false });
            if (foundPoint.provinceId != lastProvinceId) {
                const newTripProvince = new TripProvince({
                    tripId: trip._id,
                    provinceId: foundPoint.provinceId,
                    order: provinceOrder,
                    isDeleted: false
                });
                lastProvinceId = foundPoint.provinceId;
                provinceOrder = provinceOrder + 1;
                await TripProvince.create(newTripProvince);
            }
            await TripStopPoint.create(newTripStopPoint);
        })
        Promise.all(nspPromises);
        const nuPromises = req.body.utilities.map(async (utilityId) => {
            const newTripUtility = new TripUtility({
                tripId: trip._id,
                utilityId: utilityId,
                isDeleted: false
            });
            await TripUtility.create(newTripUtility);
        })
        Promise.all(nuPromises);
    }
    return {
        success: true,
        message: "Thêm chuyến xe thành công",
        code: 200
    };
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const AddPrice = async () => {
    const providers = await Provider.find({ isDeleted: false });
    const busTypes = await BusType.find({ isDeleted: false });
    const promises = providers.map(async (provider) => {
        const bPromises = busTypes.map(async (busType) => {
            const price = getRandomNumber(300, 500);
            const updateDocument = {
                $set: { price: price }
            };
            const resp = await Trip.updateMany({providerId: provider._id, busTypeId: busType._id}, updateDocument);
        })
        await Promise.all(bPromises);
    })
    await Promise.all(promises);
    return {
        success: true,
        message: "Thành công",
        code: 200
    };
}

module.exports = {
    GetUtility,
    GetTrip,
    CreateTrip,
    CreateMultipleTrip,
    AddPrice
}