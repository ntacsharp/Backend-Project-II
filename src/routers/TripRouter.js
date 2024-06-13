const TripController = require("../controllers/TripController");
const router = require('express').Router();
const authMiddleware = require('../middlewares/AuthMiddleware');

//router.get('/', ProvinceController.GetProvince);

router.post("/", TripController.GetTrip);
// router.get("/seat/:id", GetSeats);
router.get('/utility/', TripController.GetUtility);
router.put("/", authMiddleware, TripController.CreateTrip);
router.post("/multi/", authMiddleware, TripController.CreateMultipleTrip);
router.post("/price/", TripController.AddPrice);
router.patch("/cancel", authMiddleware, TripController.CancelTrip);
router.delete("/", authMiddleware, TripController.DeleteTrip);
router.get("/provider/", authMiddleware, TripController.GetProviderTrip);

module.exports = router;