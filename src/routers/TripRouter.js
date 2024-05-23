const { GetTrips, GetSeats, CreateTrip } = require("../controllers/TripController");
const router = require('express').Router();
const authMiddleware = require('../middlewares/AuthMiddleware');

//router.get('/', ProvinceController.GetProvince);

router.get("/", GetTrips);
router.get("/seat/:id", GetSeats);
router.post("/", authMiddleware, CreateTrip);

module.exports = router;