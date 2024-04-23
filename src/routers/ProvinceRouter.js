const { GetProvince, UpdateProvince } = require("../controllers/ProvinceController");
const router = require('express').Router()
const authMiddleware = require('../middlewares/AuthMiddleware');

// router.get("/", authMiddleware, GetProvince);
router.get("/", GetProvince);

module.exports = router;