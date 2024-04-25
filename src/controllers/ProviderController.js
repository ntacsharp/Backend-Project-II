const ProviderService = require("../services/ProviderService");

const GetProvider = async (req, res) => {
    try {
        const resp = await ProviderService.GetProvider();
        if(resp.success == true){
            res.status(200).json(resp);
        }
        else{
            res.status(400).json(resp);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
};

module.exports = {
    GetProvider
}