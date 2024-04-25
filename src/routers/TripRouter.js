const { GetTrips, GetSeats, GetDropoffPoints, GetPickupPoints } = require("../controllers/TripController");
const router = require('express').Router()

//router.get('/', ProvinceController.GetProvince);

router.get("/", GetTrips);
router.get("/seat/:id", GetSeats);
router.get("/dropoff/:id", GetDropoffPoints);
router.get("/pickup/:id", GetPickupPoints);

module.exports = router;