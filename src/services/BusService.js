const Bus = require("../models/Bus");
const BusType = require("../models/BusType");
const Provider = require("../models/Provider");
const SeatService = require("./SeatService");

const GetBusTypes = async (req) => {
    var resp = await BusType.find({ isDeleted: false })
        .then((allTypes) => {
            return resp = {
                success: true,
                items: allTypes,
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

const CreateBus = async (req) => {
    const id = req.body.info.id;
    var foundProvider = await Provider.findOne({ _id: id, isDeleted: false });
    if (!foundProvider) {
        return {
            success: false,
            message: "Provider only function",
            code: 403
        }
    }
    var foundBus = await Bus.findOne({ plateNumber: req.body.plateNumber, isDeleted: false });
    if (foundBus) {
        return {
            success: false,
            message: "Bus with plate number " + req.body.plateNumber + " already existed",
            code: 400
        }
    }
    var foundType = await BusType.findOne({ _id: req.body.busTypeId, isDeleted: false });
    if (!foundType) {
        return {
            success: false,
            message: "Invalid bus type",
            code: 400
        }
    }
    var newBus = new Bus({
        plateNumber: req.body.plateNumber,
        providerId: foundProvider._id,
        busTypeId: foundType._id,
        isDeleted: false
    });
    const resp = await Bus.create(newBus);
    for(var i = 0; i < req.body.seatTypeList.length; i++){
        const item = req.body.seatTypeList[i];
        await SeatService.CreateSeatType(item.type, item.price, item.amount, resp._id);
    }
    return {
        success: true,
        message: "Successfully added bus",
        code: 200,
        item: resp
    };
}

const DeleteBus = async (req) => {
    const id = req.body.info.id;
    var foundProvider = await Provider.findOne({ _id: id, isDeleted: false });
    if (!foundProvider) {
        return {
            success: false,
            message: "Provider only function",
            code: 403
        }
    }
    const resp = await Bus.findOneAndUpdate(
        { _id: req.params.id, isDeleted: false },
        {
            $set: {
                isDeleted: true
            }
        },
        { new: true }
    )
        .exec()
        .then(updatedBus => {
            if (updatedBus) {
                return {
                    success: true,
                    errMsg: 'Successfully deleted bus',
                    code: 200,
                    item: updatedBus
                }
            } else {
                return {
                    success: false,
                    errMsg: 'Invalid bus',
                    code: 400
                };
            }
        })
        .catch(err => {
            return {
                success: false,
                errMsg: err.message,
                code: 500
            };
        });
    return resp;
}

const GetBuses = async (req) => {
    const id = req.body.info.id;
    var foundProvider = await Provider.findOne({ _id: id, isDeleted: false });
    if (!foundProvider) {
        return {
            success: false,
            message: "Provider only function",
            code: 403
        }
    }
    var resp = await Bus.find({
        providerId: id, isDeleted: false
    })
        .then((allBuses) => {
            return resp = {
                success: true,
                items: allBuses,
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

const GetBusById = async (req) => {
    const id = req.body.info.id;
    var foundProvider = await Provider.findOne({ _id: id, isDeleted: false });
    if (!foundProvider) {
        return {
            success: false,
            message: "Provider only function",
            code: 403
        }
    }
    var resp = await Bus.findOne({
        providerId: id,
        _id: req.params.id,
        isDeleted: false
    })
        .then((bus) => {
            return resp = {
                success: true,
                items: bus,
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

module.exports = {
    GetBusTypes,
    CreateBus,
    DeleteBus,
    GetBuses,
    GetBusById
}