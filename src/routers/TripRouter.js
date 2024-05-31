const TripController = require("../controllers/TripController");
const router = require('express').Router();
const authMiddleware = require('../middlewares/AuthMiddleware');

//router.get('/', ProvinceController.GetProvince);

// router.get("/", GetTrips);
// router.get("/seat/:id", GetSeats);
router.post("/", authMiddleware, TripController.CreateTrip);

module.exports = router;