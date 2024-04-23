const { GetTrip } = require("../controllers/TripController");
const router = require('express').Router()

//router.get('/', ProvinceController.GetProvince);

router.get("/", GetTrip);

module.exports = router;