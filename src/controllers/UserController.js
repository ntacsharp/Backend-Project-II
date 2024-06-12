const UserService = require("../services/UserService");

const Login = async (req, res) => {
    try {
        const resp = await UserService.Login(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

const Register = async (req, res) => {
    try {
        const resp = await UserService.Register(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

const AddBalance = async (req, res) => {
    try {
        const resp = await UserService.AddBalance(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

module.exports = {
    Login,
    Register,
    AddBalance
}