const TripService = require("../services/TripService");

const GetUtility = async (req, res) => {
    try {
        const resp = await TripService.GetUtility();
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
};

const GetTrip = async (req, res) => {
    try {
        const resp = await TripService.GetTrip(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
};

const CreateTrip = async (req, res) => {
    try {
        const resp = await TripService.CreateTrip(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

module.exports = {
    GetUtility,
    GetTrip,
    // GetSeats,
    CreateTrip
}