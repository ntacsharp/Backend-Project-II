const { GetProvince } = require("../controllers/ProvinceController");
const router = require('express').Router()

//router.get('/', ProvinceController.GetProvince);

router.route("/")
    .get(GetProvince);

module.exports = router;