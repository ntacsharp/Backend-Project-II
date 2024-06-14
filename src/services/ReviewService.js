const Review = require("../models/Review");
const User = require("../models/User");
const Trip = require("../models/Trip");

const AddReview = async (req) => {
    const id = req.body.info.id;
    var foundUser = await User.findOne({ _id: id, isDeleted: false });
    if (!foundUser) {
        return {
            success: false,
            message: "Chưa đăng nhập",
            code: 401
        }
    }
    var foundTrip = await Trip.findOne({ _id: req.body.tripId, isDeleted: false });
    if (!foundTrip) {
        return {
            success: false,
            message: "Chuyến xe không tồn tại",
            code: 400
        }
    }
    const newReview = new Review({
        tripId: req.body.tripId,
        userId: id,
        comment: req.body.comment,
        star: req.body.star,
        isDeleted: false
    });
    const review = await Review.create(newReview);
    return {
        success: true,
        message: "Phản hồi thành công",
        item: review,
        code: 200
    };
}

const DeleteReview = async (req) => {
    const id = req.body.info.id;
    var foundUser = await User.findOne({ _id: id, isDeleted: false });
    if (!foundUser) {
        return {
            success: false,
            message: "Chưa đăng nhập",
            code: 401
        }
    }
    var foundReview = await Review.findOne({ _id: req.params.reviewId, isDeleted: false });
    if (!foundReview) {
        return {
            success: false,
            message: "Phản hồi không tồn tại",
            code: 400
        }
    }
    if(id != foundUser.userId){
        return {
            success: false,
            message: "Bạn không có quyền xóa phản hồi này",
            code: 403
        }
    }
    const updateDocument = {
        $set: { isDeleted: true }
    }
    const resp = await Review.updateMany({ _id: req.params.reviewId, isDeleted: false }, updateDocument);
    return {
        success: true,
        message: "Xóa phản hồi thành công",
        code: 200
    };
}

module.exports = {
    AddReview,
    DeleteReview
}