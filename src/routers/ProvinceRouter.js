const ProvinceController = require("../controllers/ProvinceController");
const router = require('express').Router()
const authMiddleware = require('../middlewares/AuthMiddleware');

// router.get("/", authMiddleware, GetProvince);
router.get("/", ProvinceController.GetProvince);
router.get("/stop_point/", ProvinceController.GetStopPoint);

module.exports = router;