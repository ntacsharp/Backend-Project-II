const mongoose = require("mongoose");
const Seat = require("../models/Seat");
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
        isDeleted: false
    });
    const resp = await SeatType.create(newSeatType);
    for (var i = 0; i < amount; i++) {
        const newSeat = new Seat({
            seatTypeId: newSeatType._id,
            busId: busId,
            isDeleted: false
        });
        await Seat.create(newSeat);
    }
    return resp;
}

module.exports = {
    GetSeats,
    CreateSeatType
}