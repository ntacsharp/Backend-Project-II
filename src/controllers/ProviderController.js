const ProviderService = require("../services/ProviderService");

const GetProvider = async (req, res) => {
    try {
        const resp = await ProviderService.GetProvider();
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
};

const Register = async (req, res) => {
    try {
        const resp = await ProviderService.Register(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

const Login = async (req, res) => {
    try {
        const resp = await ProviderService.Login(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

const UpdateProvider = async (req, res) => {
    try {
        const resp = await ProviderService.UpdateProvider(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

module.exports = {
    GetProvider,
    Register,
    Login,
    UpdateProvider
}