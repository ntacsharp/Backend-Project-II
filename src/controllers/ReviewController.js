const ReviewService = require("../services/ReviewService");

const AddReview = async (req, res) => {
    try {
        const resp = await ReviewService.AddReview(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
};

const DeleteReview = async (req, res) => {
    try {
        const resp = await ReviewService.DeleteReview(req);
        res.status(resp.code).json(resp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
};

module.exports = {
    AddReview,
    DeleteReview
}