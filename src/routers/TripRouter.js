const { GetTrips, GetSeats, GetDropoffPoints, GetPickupPoints, CreateTrip } = require("../controllers/TripController");
const router = require('express').Router();
const authMiddleware = require('../middlewares/AuthMiddleware');

//router.get('/', ProvinceController.GetProvince);

router.get("/", GetTrips);
router.get("/seat/:id", GetSeats);
router.get("/dropoff/:id", GetDropoffPoints);
router.get("/pickup/:id", GetPickupPoints);
router.post("/", authMiddleware, CreateTrip);

module.exports = router;