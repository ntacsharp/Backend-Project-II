const mongoose = require("mongoose");
const Provider = require("../models/Provider");
const AuthService = require("./AuthService");
const bcrypt = require('bcrypt');

const GetProvider = async (req) => {
    const id = req.body.info.id;
    var foundProvider = await Provider.findOne({ _id: id, isDeleted: false }, "name phoneNumber email address");
    if (foundProvider == null) return {
        success: false,
        message: "Nhà xe không tồn tại",
        code: 400
    };
    return {
        success: true,
        message: "Thành công",
        code: 200,
        item: foundProvider
    }
}

const Register = async (req) => {
    var foundProvider = await Provider.findOne({ $or: [{ email: req.body.userName }, { phoneNumber: req.body.userName }], isDeleted: false });
    if (foundProvider != null) return {
        success: false,
        message: "Đã tồn tại nhà xe",
        code: 400
    };
    const newProvider = new Provider({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        address: req.body.address,
        passwordHarsh: await AuthService.hashPassword(req.body.password),
        isDeleted: false,
        isVerified: true
    });
    Provider.create(newProvider);
    return {
        success: true,
        message: "Đã tạo nhà xe thành công",
        code: 200
    };
}

const Login = async (req) => {
    var foundProvider = await Provider.findOne({ $or: [{ email: req.body.userName }, { phoneNumber: req.body.userName }], isDeleted: false });
    if (foundProvider == null) return {
        success: false,
        message: "Không tồn tại nhà xe",
        code: 401
    };
    if (foundProvider.isVerified == false) return {
        success: false,
        message: "Nhà xe chưa được xác nhận",
        code: 401
    };
    if (req.body.password != null) {
        if (!bcrypt.compare(req.body.password, foundProvider.passwordHarsh)) {
            return {
                success: false,
                message: "Sai tài khoản hoặc mật khẩu",
                code: 401
            };
        }
        else {
            return {
                success: true,
                message: "Đăng nhập thành công",
                code: 200,
                token: AuthService.generateToken(foundProvider._id)
            };
        }
    }
    else return null;
}

const UpdateProvider = async (req) => {
    const providerId = req.body.info.id;
    const updateFields = {};
    if (req.body.name) updateFields.name = req.body.name;
    if (req.body.address) updateFields.address = req.body.address;
    const resp = await Provider.findOneAndUpdate(
        { _id: providerId, isDeleted: false },
        { $set: updateFields },
        { new: true }
    )
        .exec()
        .then(updatedProvider => {
            if (updatedProvider) {
                return {
                    success: true,
                    errMsg: 'Successfully updated provider',
                    code: 200,
                    item: updatedProvider
                }
            } else {
                return {
                    success: false,
                    code: 401,
                    errMsg: 'Provider not found'
                };
            }
        })
        .catch(err => {
            return {
                success: false,
                code: 500,
                errMsg: err.message
            };
        });
    return resp;
}

module.exports = {
    GetProvider,
    Register,
    Login,
    UpdateProvider
}