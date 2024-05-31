const TripService = require("../services/TripService");

// const GetTrips = async (req, res) => {
//     try {
//         const resp = await TripService.GetTrips(req);
//         res.status(resp.code).json(resp);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     };
// };

// const GetSeats = async (req, res) => {
//     try {
//         const resp = await SeatService.GetSeats(req);
//         res.status(resp.code).json(resp);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     };
// };
const CreateTrip = async (req, res) => {
    try {
        const resp = await TripService.CreateTrip(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

module.exports = {
    // GetTrips,
    // GetSeats,
    CreateTrip
}