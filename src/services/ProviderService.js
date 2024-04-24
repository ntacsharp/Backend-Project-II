const mongoose = require("mongoose");
const Provider = require("../models/Provider");
const AuthService = require("./AuthService");

const GetProvider = async (req, res) => {
    // var resp = NhaXe.find()
    //             .select('id ten sdt email diachi')
    //             .then((allProvider) => {
    //                 return resp = {
    //                     success: true,
    //                     items: allProvider
    //                 };
    //             })
    //             .catch((err) => {
    //                 return resp = {
    //                     success: false,
    //                     errMsg: err.message
    //                 };
    //             });
    // return resp;
    return await Provider.find();
}

const CreateProvider = async (req) => {
    var foundProvider = await Provider.findOne({ $or: [{ email: req.body.userName }, { phoneNumber: req.body.userName }] });
    if (foundProvider != null) return {
        success: false,
        message: "Đã tồn tại nhà xe",
    };
    const newProvider = new Provider({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        address: req.body.address,
        passwordHarsh: await AuthService.hashPassword(req.body.password),
        isDeleted: false,
        isVerified: false
    });
    Provider.create(newProvider);
    return {
        success: true,
        message: "Đã tạo nhà xe thành công",
    };
}

const Login = async (req) => {
    var foundProvider = await Provider.findOne({ $or: [{ email: req.body.userName }, { phoneNumber: req.body.userName }] });
    if (foundProvider == null) return {
        success: false,
        message: "Không tồn tại nhà xe",
    };
    if (foundProvider.isVerified == false) return {
        success: false,
        message: "Nhà xe chưa được xác nhận",
    };
    if (req.body.password != null) {
        if (bcrypt.compare(req.body.password, foundProvider.passwordHarsh)) {
            return {
                success: false,
                message: "Sai tài khoản hoặc mật khẩu",
            };
        }
        else {
            return {
                success: true,
                message: "Đăng nhập thành công",
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
    const resp = ProviderModel.findOneAndUpdate(
        { _id: providerId },
        { $set: updateFields },
        { new: true }
    )
        .exec()
        .then(updatedProvider => {
            if (updatedProvider) {
                return updatedProvider

            } else {
                return {
                    success: false,
                    errMsg: 'Provider not found'
                };
            }
        })
        .catch(err => {
            return {
                success: false,
                errMsg: err.message
            };
        });
    return resp;
}

module.exports = {
    GetProvider,
    CreateProvider,
    Login,
    UpdateProvider
}