const ProvinceController = require("../controllers/ProvinceController");

const router = require('express').Router()

router.get('/', ProvinceController.GetProvince);

module.exports = router;