const TripService = require("../services/TripService");
const SeatService = require("../services/SeatService");
const DropoffPointService = require("../services/DropoffPointService");
const PickupPointService = require("../services/PickupPointService");

const GetTrips = async (req, res) => {
    try {
        const resp = await TripService.GetTrips(req);
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

const GetSeats = async (req, res) => {
    try {
        const resp = await SeatService.GetSeats(req);
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

const GetDropoffPoints = async (req, res) => {
    try {
        const resp = await DropoffPointService.GetDropoffPoints(req);
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

const GetPickupPoints = async (req, res) => {
    try {
        const resp = await PickupPointService.GetPickupPoints(req);
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
    GetTrips,
    GetSeats,
    GetDropoffPoints,
    GetPickupPoints
}