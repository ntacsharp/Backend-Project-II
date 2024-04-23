const mongoose = require("mongoose");
const User = require("../models/User");
const AuthService = require("./AuthService");

const Login = async (req) => {
    var foundUser = await User.findOne({ $or: [{ email: req.userName }, { phoneNumber: req.userName }] });
    if (foundUser == null) return {
        success: false,
        message: "Không tồn tại người dùng",
    };
    if (req.password != null) {
        if (bcrypt.compare(req.password, foundUser.passwordHarsh)) {
            return {
                success: false,
                message: "Sai tài khoản hoặc mật khẩu",
            };
        }
        else {
            return {
                success: true,
                message: "Đăng nhập thành công",
                token: AuthService.generateToken(foundUser._id)
            };
        }
    }
    else return null;
}

const Register = async (req) => {
    var foundUser = await User.findOne({ $or: [{ email: req.userName }, { phoneNumber: req.userName }] });
    if (foundUser != null) return {
        success: false,
        message: "Đã tồn tại người dùng",
    };
    const newUser = new User({
        name: req.name,
        phoneNumber: req.phoneNumber,
        email: req.email,
        passwordHarsh: await AuthService.hashPassword(req.password),
        isDeleted: false
    });
    User.create(newUser);
    return {
        success: true,
        message: "Đã tạo người dùng thành công",
    };
}

module.exports = {
    Login,
    Register
}