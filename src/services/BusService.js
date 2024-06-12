const Bus = require("../models/Bus");
const BusType = require("../models/BusType");
const Provider = require("../models/Provider");
const BrandService = require("./BrandService");
// const SeatService = require("./SeatService");

const GetBusTypes = async (req) => {
    var resp = await BusType.find({ isDeleted: false });
    var rPromises = resp.map(async (busType) => {
        busType.brands = await BrandService.GetBrand(busType.id);
    });
    await Promise.all(rPromises);
    return {
        success: true,
        items: resp,
        code: 200
    };
}

const CreateBus = async (req) => {
    const id = req.body.info.id;
    var foundProvider = await Provider.findOne({ _id: id, isDeleted: false });
    if (!foundProvider) {
        return {
            success: false,
            message: "Chức năng chỉ dành cho nhà xe",
            code: 403
        }
    }
    var foundBus = await Bus.findOne({ plateNumber: req.body.plateNumber, isDeleted: false });
    if (foundBus) {
        return {
            success: false,
            message: "Đã tồn tại xe với biển số " + req.body.plateNumber,
            code: 400
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
    var newBus = new Bus({
        plateNumber: req.body.plateNumber,
        providerId: foundProvider._id,
        busTypeId: foundType._id,
        isDeleted: false
    });
    const resp = await Bus.create(newBus);
    return {
        success: true,
        message: "Thêm xe buýt thành công",
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
            message: "Chức năng chỉ dành cho nhà xe",
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
                    errMsg: 'Xóa xe thành công',
                    code: 200,
                    item: updatedBus
                }
            } else {
                return {
                    success: false,
                    errMsg: 'Xe không tồn tại',
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
            message: "Chức năng chỉ dành cho nhà xe",
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
            message: "Chức năng chỉ dành cho nhà xe",
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