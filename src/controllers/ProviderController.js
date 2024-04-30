const ProviderService = require("../services/ProviderService");

const GetProvider = async (req, res) => {
    try {
        const resp = await ProviderService.GetProvider();
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
};

// const 

module.exports = {
    GetProvider
}