const ProviderController = require("../controllers/ProviderController");
const router = require('express').Router()
const authMiddleware = require('../middlewares/AuthMiddleware');

router.post("/login", ProviderController.Login);
router.post("/register", ProviderController.Register);
router.patch("/", authMiddleware, ProviderController.UpdateProvider);
router.get("/", ProviderController.GetProvider);

module.exports = router;