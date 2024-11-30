const express = require("express");
const {
  addReview,
  getReviews,
  likeReview,
  dislikeReview,
} = require("../controller/reviewController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/Multer");
const router = express.Router();

// Middleware to check if user is authenticated (assume you have an authentication middleware)

// Route to get reviews for a product
// Route to add a new review for a product
router.post(
  "/product/reviews/:productId",
  authMiddleware, // Ensure the user is authenticated
  upload.array("images", 10), // Handle the image upload (single image upload field named "image")
  addReview // Call the controller function to add a review
);

router.get("/reviews/:productId", getReviews);
router.post("/like/:reviewId", authMiddleware, likeReview);
router.post("/dislike/:reviewId", authMiddleware, dislikeReview);

module.exports = router;
