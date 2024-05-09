const mongoose = require("mongoose");
const SeatType = require("../models/SeatType");
const Trip = require("../models/Trip");

const GetSeats = async (req) => {
    const id = req.params.id;
    const trip = await Trip.findOne({ _id: id });
    const resp = await Seat.find({ busId: trip.busId, isDeleted: false })
        .then((allSeats) => {
            allSeats.array.forEach((seat) => {
                const seatType = SeatType.findOne({ _id: seat.seatTypeId });
                seat.type = seatType;
            });
            return resp = {
                success: true,
                code: 200,
                items: allSeats
            };
        })
        .catch((err) => {
            return resp = {
                success: false,
                code: 500,
                errMsg: err.message
            };
        });
    return resp;
}

const CreateSeatType = async (type, price, amount, busId) => {
    var newSeatType = new SeatType({
        type: type,
        busId: busId,
        price: price,
        seatCount: amount,
        isDeleted: false
    });
    const resp = await SeatType.create(newSeatType);
    return resp;
}

module.exports = {
    GetSeats,
    CreateSeatType
}