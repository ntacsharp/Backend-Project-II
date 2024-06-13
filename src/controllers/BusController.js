const BusService = require("../services/BusService");

const GetBusTypes = async (req, res) => {
    try {
        const resp = await BusService.GetBusTypes();
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

const GetBuses = async (req, res) => {
    try {
        const resp = await BusService.GetBuses(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

// const GetBusById = async (req, res) => {
//     try {
//         const resp = await BusService.GetBusById(req);
//         res.status(resp.code).json(resp);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     };
// }

const CreateBus = async (req, res) => {
    try {
        const resp = await BusService.CreateBus(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

const DeleteBus = async (req, res) => {
    try {
        const resp = await BusService.DeleteBus(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

module.exports = {
    GetBusTypes,
    CreateBus,
    DeleteBus,
    GetBuses,
    // GetBusById
}