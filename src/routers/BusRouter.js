const BusController = require("../controllers/BusController");
const router = require('express').Router()
const authMiddleware = require('../middlewares/AuthMiddleware');

router.get("/types", BusController.GetBusTypes);
router.get("/", authMiddleware, BusController.GetBuses);
router.get("/:id", authMiddleware, BusController.GetBusById);
router.post("/", authMiddleware, BusController.CreateBus);
router.delete("/:id", authMiddleware, BusController.DeleteBus);

module.exports = router;