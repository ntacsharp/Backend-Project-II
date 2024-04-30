const mongoose = require("mongoose");
const User = require("../models/User");
const AuthService = require("./AuthService");
const bcrypt = require('bcrypt');

const Login = async (req) => {
    var foundUser = await User.findOne({ $or: [{ email: req.body.userName }, { phoneNumber: req.body.userName }] });
    if (foundUser == null) return {
        success: false,
        message: "Không tồn tại người dùng",
        code: 401
    };
    if (req.body.password != null) {
        if (!bcrypt.compare(req.body.password, foundUser.passwordHarsh)) {
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
                token: AuthService.generateToken(foundUser._id)
            };
        }
    }
    else return null;
}

const Register = async (req) => {
    var foundUser = await User.findOne({ $or: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }] });
    if (foundUser != null) return {
        success: false,
        message: "Đã tồn tại người dùng",
        code: 400
    };
    const newUser = new User({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        passwordHarsh: await AuthService.hashPassword(req.body.password),
        isDeleted: false
    });
    User.create(newUser);
    return {
        success: true,
        message: "Đã tạo người dùng thành công",
        code: 200
    };
}

module.exports = {
    Login,
    Register
}