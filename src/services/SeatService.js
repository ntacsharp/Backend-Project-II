const mongoose = require("mongoose");
const Seat = require("../models/Seat");
const SeatType = require("../models/SeatType");
const Trip = require("../models/Trip");

const GetSeats = async (req) => {
    const id = req.params.id;
    const trip = Trip.findOne({ _id: id });
    const resp = Seat.find({ busId: trip.busId })
        .then((allSeats) => {
            allSeats.array.forEach((seat) => {
                const seatType = SeatType.findOne({ _id: seat.seatTypeId });
                seat.type = seatType;
            });
            return resp = {
                success: true,
                items: allSeats
            };
        })
        .catch((err) => {
            return resp = {
                success: false,
                errMsg: err.message
            };
        });
    return resp;
}

module.exports = {
    GetSeats
}