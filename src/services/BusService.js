const Bus = require("../models/Bus");
const BusType = require("../models/BusType");
const Provider = require("../models/Provider");

const GetBusTypes = async (req) => {
    var resp = BusType.find({ isDeleted: false })
        .then((allTypes) => {
            return resp = {
                success: true,
                items: allTypes
            };
        })
        .catch((err) => {
            return resp = {
                success: false,
                errMsg: err.message
            };
        });
    return resp;
}

const CreateBus = async (req) => {
    const id = req.body.info.id;
    var foundProvider = Provider.findOne({ _id: id });
    if (!foundProvider) {
        return {
            success: false,
            message: "Provider only function",
            code: 403
        }
    }
    var foundBus = Bus.findOne({ plateNumber: req.body.plateNumber, isDeleted: false });
    if (foundBus) {
        return {
            success: false,
            message: "Bus with plate number " + req.body.plateNumber + " already existed",
            code: 400
        }
    }
    var foundType = BusType.findOne({ _id: req.body.busTypeId });
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
    const bus = Bus.create(newBus);
    return {
        success: true,
        message: "Successfully added bus",
        code: 200,
        item: bus
    };
}

const DeleteBus = async (req) => {
    const id = req.body.info.id;
    var foundProvider = Provider.findOne({ _id: id });
    if (!foundProvider) {
        return {
            success: false,
            message: "Provider only function",
            code: 403
        }
    }
    const resp = Bus.findOneAndUpdate(
        { _id: req.params.id },
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
    var foundProvider = Provider.findOne({ _id: id });
    if (!foundProvider) {
        return {
            success: false,
            message: "Provider only function",
            code: 403
        }
    }
    var resp = Bus.find({
        providerId: id
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
    var foundProvider = Provider.findOne({ _id: id });
    if (!foundProvider) {
        return {
            success: false,
            message: "Provider only function",
            code: 403
        }
    }
    var resp = Bus.findOne({
        providerId: id,
        _id: req.params.id
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