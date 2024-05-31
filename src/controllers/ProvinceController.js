const ProvinceService = require("../services/ProvinceService");

const GetProvince = async (req, res) => {
    try {
        const resp = await ProvinceService.GetProvince();
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
};

const GetStopPoint = async (req, res) => {
    try {
        const resp = await ProvinceService.GetStopPoint(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
};

module.exports = {
    GetProvince,
    GetStopPoint
}