const TicketController = require("../controllers/TicketController");
const router = require('express').Router();
const authMiddleware = require('../middlewares/AuthMiddleware');

router.post("/", authMiddleware, TicketController.CreateTicket);
router.get("/", authMiddleware, TicketController.GetTicket);
router.patch("/confirm", authMiddleware, TicketController.ConfirmTicket);
router.patch("/pay", authMiddleware, TicketController.PayTicket);
router.delete("/", authMiddleware, TicketController.DeleteTicket);

module.exports = router;
