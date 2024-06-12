const TripController = require("../controllers/TripController");
const router = require('express').Router();
const authMiddleware = require('../middlewares/AuthMiddleware');

//router.get('/', ProvinceController.GetProvince);

router.get("/", TripController.GetTrip);
// router.get("/seat/:id", GetSeats);
router.get('/utility/', TripController.GetUtility);
router.post("/", authMiddleware, TripController.CreateTrip);
router.post("/multi/", authMiddleware, TripController.CreateMultipleTrip);
router.post("/price/", TripController.AddPrice);
router.patch("/cancel", authMiddleware, TripController.CancelTrip);
router.delete("/", authMiddleware, TripController.DeleteTrip);

module.exports = router;