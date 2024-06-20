const router = require('express').Router();
const authMiddleware = require('../middlewares/AuthMiddleware');
const ReviewController = require("../controllers/ReviewController");

router.post("/", authMiddleware, ReviewController.AddReview);
router.delete("/:reviewId", authMiddleware, ReviewController.DeleteReview);
router.get("/:id", ReviewController.GetReview);

module.exports = router;