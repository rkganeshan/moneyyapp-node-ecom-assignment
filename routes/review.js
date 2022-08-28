const express=require("express");
const {createReview,deleteReview,getAllReviewsByProductId } = require("../controllers/review");
const router=express.Router();


router.get("/:productId",getAllReviewsByProductId);
router.post("/new/:productId",createReview);
router.delete("/delete/:reviewId",deleteReview);

module.exports=router;