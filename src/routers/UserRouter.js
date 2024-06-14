const UserController = require("../controllers/UserController");
const router = require('express').Router();
const authMiddleware = require('../middlewares/AuthMiddleware');

router.post("/login", UserController.Login);
router.post("/register", UserController.Register);
router.patch("/balance", authMiddleware, UserController.AddBalance);
router.get("/", authMiddleware, UserController.GetUser);

module.exports = router;