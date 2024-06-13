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

const CreateMultipleTrip = async (req, res) => {
    try {
        const resp = await TripService.CreateMultipleTrip(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

const AddPrice = async (req, res) => {
    try {
        const resp = await TripService.AddPrice();
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

const CancelTrip = async (req, res) => {
    try {
        const resp = await TripService.CancelTrip(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

const DeleteTrip = async (req, res) => {
    try {
        const resp = await TripService.DeleteTrip(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

const GetProviderTrip = async (req, res) => {
    try {
        const resp = await TripService.GetProviderTrip(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

module.exports = {
    GetUtility,
    GetTrip,
    CreateTrip,
    CreateMultipleTrip,
    AddPrice,
    CancelTrip,
    DeleteTrip,
    GetProviderTrip
}