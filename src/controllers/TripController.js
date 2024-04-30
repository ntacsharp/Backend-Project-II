const TripService = require("../services/TripService");
const SeatService = require("../services/SeatService");
const DropoffPointService = require("../services/DropoffPointService");
const PickupPointService = require("../services/PickupPointService");

const GetTrips = async (req, res) => {
    try {
        const resp = await TripService.GetTrips(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
};

const GetSeats = async (req, res) => {
    try {
        const resp = await SeatService.GetSeats(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

const GetDropoffPoints = async (req, res) => {
    try {
        const resp = await DropoffPointService.GetDropoffPoints(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

const GetPickupPoints = async (req, res) => {
    try {
        const resp = await PickupPointService.GetPickupPoints(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

module.exports = {
    GetTrips,
    GetSeats,
    GetDropoffPoints,
    GetPickupPoints
}