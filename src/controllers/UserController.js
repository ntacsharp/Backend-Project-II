const UserService = require("../services/UserService");

const Login = async (req, res) => {
    try {
        const resp = await UserService.Login(req);
        if(resp.success == true){
            res.status(200).json(resp);
        }
        else{
            res.status(401).json(resp);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

const Register = async (req, res) => {
    try {
        const resp = await UserService.Register(req);
        if(resp.success == true){
            res.status(200).json(resp);
        }
        else{
            res.status(400).json(resp);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

module.exports = {
    Login,
    Register
}