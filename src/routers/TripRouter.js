const TripController = require("../controllers/TripController");
const router = require('express').Router();
const authMiddleware = require('../middlewares/AuthMiddleware');

//router.get('/', ProvinceController.GetProvince);

router.get("/", TripController.GetTrip);
// router.get("/seat/:id", GetSeats);
router.get('/ultility', TripController.GetUtility);
router.post("/", authMiddleware, TripController.CreateTrip);

module.exports = router;