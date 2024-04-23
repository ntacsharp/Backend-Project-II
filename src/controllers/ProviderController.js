const ProviderService = require("../services/ProviderService");

const GetProvider = async (req, res) => {
    try {
        const resp = await ProviderService.GetProvider();
        res.json({ data: resp });
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
};

module.exports = {
    GetProvider
}