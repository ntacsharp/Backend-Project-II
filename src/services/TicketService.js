const mongoose = require("mongoose");
const Trip = require("../models/Trip");
const User = require("../models/User");
const Ticket = require("../models/Ticket");
const BusType = require("../models/BusType");
const StopPoint = require("../models/StopPoint");
const TripStopPoint = require("../models/TripStopPoint");
const Provider = require("../models/Provider");
const TimeService = require("./TimeService");

const CreateTicket = async (req) => {
    const id = req.body.info.id;
    var foundUser = await User.findOne({ _id: id, isDeleted: false });
    if (!foundUser) {
        return {
            success: false,
            message: "Chức năng chỉ dùng cho khách hàng",
            code: 401
        }
    }
    const foundTrip = await Trip.findOne({ _id: req.body.tripId, isDeleted: false });
    if (!foundTrip) {
        return {
            success: false,
            message: "Chuyến xe không hợp lệ",
            code: 400
        }
    }
    const current = new Date();
    const foundTickets = await Ticket.find({ tripId: req.body.tripId, date: req.body.date, isDeleted: false, isConfirmed: true });
    const busType = await BusType.findOne({ _id: foundTrip.busTypeId, isDeleted: false });
    if (!foundTickets) foundTickets = [];
    if (busType) {
        var cnt = 0;
        foundTickets.map((foundTicket) => {
            cnt += foundTicket.seatCount;
        })
        if (cnt + req.body.seatCount <= busType.seatCount) {
            const newTicket = new Ticket({
                userId: id,
                tripId: req.body.tripId,
                date: new Date(req.body.date),
                departurePointId: req.body.departurePointId,
                arrivalPointId: req.body.arrivalPointId,
                createdTime: new Date(),
                seatCount: req.body.seatCount,
                price: req.body.seatCount * foundTrip.price,
                isPaid: false,
                isConfirmed: true,
                isDeleted: false
            });
            if (current > new Date(newTicket.date)) {
                return {
                    success: false,
                    message: "Ngày đi không hợp lệ",
                    code: 400
                }
            }
            const ticket = await Ticket.create(newTicket);
            return {
                success: true,
                message: "Đặt vé xe thành công",
                // item: ticket,
                code: 200
            };
        }
        else {
            return {
                success: false,
                message: "Xe không còn đủ ghế trống",
                code: 400
            };
        }
    }
    else {
        return {
            success: false,
            message: "Không hợp lệ",
            code: 400
        };
    }
}

const GetTicket = async (req) => {
    const id = req.body.info.id;
    var foundUser = await User.findOne({ _id: id, isDeleted: false });
    if (!foundUser) {
        return {
            success: false,
            message: "Chưa đăng nhập",
            code: 401
        }
    }
    const foundTickets = await Ticket.find({ userId: id, isDeleted: false });
    const ticketList = [];
    const tPromises = foundTickets.map(async (ticket) => {
        const tripDeparturePoint = await TripStopPoint.findOne({ _id: ticket.departurePointId, isDeleted: false });
        const tripArrivalPoint = await TripStopPoint.findOne({ _id: ticket.arrivalPointId, isDeleted: false });
        const departurePoint = await StopPoint.findOne({ _id: tripDeparturePoint.stopPointId, isDeleted: false });
        const arrivalPoint = await StopPoint.findOne({ _id: tripArrivalPoint.stopPointId, isDeleted: false });
        const trip = await Trip.findOne({ _id: ticket.tripId, isDeleted: false });
        const ticketDTO = {
            id: ticket._id,
            tripId: trip._id,
            departurePoint: {
                name: departurePoint.name,
                address: departurePoint.address,
                time: TimeService.combineDateTime(ticket.date, tripDeparturePoint.time)
            },
            arrivalPoint: {
                name: arrivalPoint.name,
                address: arrivalPoint.address,
                time: TimeService.combineDateTime(ticket.date, tripArrivalPoint.time)
            },
            price: ticket.price,
            seatCount: ticket.seatCount,
            createdTime: ticket.createdTime,
            isConfirmed: ticket.isConfirmed,
            isPaid: ticket.isPaid,
        };
        ticketList.push(ticketDTO);
    })
    await Promise.all(tPromises);
    return {
        success: true,
        items: ticketList,
        code: 200
    };
}

const ConfirmTicket = async (req) => {
    const id = req.body.info.id;
    var foundProvider = await Provider.findOne({ _id: id, isDeleted: false });
    if (!foundProvider) {
        return {
            success: false,
            message: "Chức năng chỉ dành cho nhà xe",
            code: 403
        }
    }
    var foundTicket = await Ticket.findOne({ _id: req.body.ticketId, isDeleted: false });
    if (!foundTicket) {
        return {
            success: false,
            message: "Vé xe không tồn tại",
            code: 400
        }
    }
    const updateDocument = {
        $set: { isConfirmed: true }
    };
    const resp = await Ticket.updateMany({ _id: req.body.ticketId, isDeleted: false }, updateDocument);
    return {
        success: true,
        message: "Xác nhận vé thành công",
        code: 200
    };
}

const PayTicket = async (req) => {
    const id = req.body.info.id;
    var foundUser = await User.findOne({ _id: id, isDeleted: false });
    if (!foundUser) {
        return {
            success: false,
            message: "Chưa đăng nhập",
            code: 401
        }
    }
    var foundTicket = await Ticket.findOne({ _id: req.body.ticketId, isDeleted: false });
    if (!foundTicket) {
        return {
            success: false,
            message: "Vé xe không tồn tại",
            code: 400
        }
    }
    if (foundTicket.isConfirmed !== true) {
        return {
            success: false,
            message: "Vé xe chưa được xác nhận",
            code: 403
        }
    }
    if (foundTicket.isPaid === true) {
        return {
            success: false,
            message: "Vé xe đã được thanh toán",
            code: 403
        }
    }
    if (foundUser.balance - foundTicket.price < 0) {
        return {
            success: false,
            message: "Số dư tài khoản không đủ",
            code: 400
        }
    }
    const ticketUpdateDocument = {
        $set: { isPaid: true }
    };
    await Ticket.updateMany({ _id: req.body.ticketId, isDeleted: false }, ticketUpdateDocument);
    const userUpdateDocument = {
        $set: { balance: foundUser.balance - foundTicket.price }
    }
    await User.updateMany({ _id: id, isDeleted: false }, userUpdateDocument);
    return {
        success: true,
        message: "Thanh toán vé thành công",
        code: 200
    };
}

const DeleteTicket = async (req) => {
    const id = req.body.info.id;
    var foundUser = await User.findOne({ _id: id, isDeleted: false });
    if (!foundUser) {
        return {
            success: false,
            message: "Chưa đăng nhập",
            code: 401
        }
    }
    var foundTicket = await Ticket.findOne({ _id: req.body.ticketId, isDeleted: false });
    if (!foundTicket) {
        return {
            success: false,
            message: "Vé xe không tồn tại",
            code: 400
        }
    }
    if (foundTicket.isPaid === true) {
        const current = new Date();
        const tdp = await TripStopPoint.findOne({_id: foundTicket.departurePointId, isDeleted: false});
        if (current < TimeService.combineDateTime(foundTicket.date, tdp.time)) {
            if (current.getDate() == foundTicket.date.getDate()) {
                const updateDocument = {
                    $set: { balance: foundUser.balance + foundTicket.price / 2 }
                }
                await User.updateMany({ _id: id, isDeleted: false }, updateDocument);
            }
            else {
                const updateDocument = {
                    $set: { balance: foundUser.balance + foundTicket.price }
                }
                await User.updateMany({ _id: id, isDeleted: false }, updateDocument);
            }

        }
        else {
            return {
                success: false,
                message: "Qúa hạn hủy vé xe",
                code: 403
            }
        }
    }
    const updateDocument = {
        $set: { isDeleted: true }
    };
    await Ticket.updateMany({ _id: req.body.ticketId, isDeleted: false }, updateDocument);
    return {
        success: true,
        message: "Hủy vé thành công",
        code: 200
    };
}

module.exports = {
    CreateTicket,
    GetTicket,
    ConfirmTicket,
    PayTicket,
    DeleteTicket
}