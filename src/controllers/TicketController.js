const TicketService = require("../services/TicketService");

const CreateTicket = async (req, res) => {
    try {
        const resp = await TicketService.CreateTicket(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

const GetTicket = async (req, res) => {
    try {
        const resp = await TicketService.GetTicket(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

const ConfirmTicket = async (req, res) => {
    try {
        const resp = await TicketService.ConfirmTicket(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

const PayTicket = async (req, res) => {
    try {
        const resp = await TicketService.PayTicket(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

const DeleteTicket = async (req, res) => {
    try {
        const resp = await TicketService.DeleteTicket(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

module.exports = {
    CreateTicket,
    GetTicket,
    ConfirmTicket,
    PayTicket,
    DeleteTicket
}