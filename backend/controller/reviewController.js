const Product = require("../models/productModel"); // Product schema
const cloudinary = require("cloudinary");

// Add a new review to a product
const addReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, comment, title } = req.body;

    console.log(req.body);

    const userId = req.user.id;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Invalid rating value" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Upload image to Cloudinary if provided
    let imageUrls = [];
    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "product-review-images",
        });
        imageUrls.push(result.secure_url);
      }
    }
    console.log("imageUrls", imageUrls);

    // Create new review
    const newReview = {
      user: userId,
      rating,
      title,
      comment,
      images: imageUrls,
      createdAt: new Date(),
    };

    product.reviews.push(newReview);
    await product.save();

    res.status(201).json({ message: "Review added successfully", product });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch reviews for a product
const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId).populate(
      "reviews.user",
      "userName "
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Reviews fetched successfully",
      reviews: product.reviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Like a review
const likeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    console.log("reviewId", reviewId);
    console.log(req.user.id);

    const userId = req.user.id;

    const product = await Product.findOne({ "reviews._id": reviewId });

    if (!product) {
      return res.status(404).json({ message: "Review not found" });
    }

    const review = product.reviews.id(reviewId);

    // Prevent multiple likes by the same user
    if (review.likedBy.includes(userId)) {
      return res.status(400).json({ message: "You already liked this review" });
    }

    // Remove user from dislikes if they had disliked it
    review.dislikedBy = review.dislikedBy.filter(
      (id) => id.toString() !== userId.toString()
    );
    review.dislikes = review.dislikedBy.length;

    // Add user to likes
    review.likedBy.push(userId);
    review.likes = review.likedBy.length;

    await product.save();

    res.status(200).json({ message: "Review liked successfully", review });
  } catch (error) {
    console.error("Error liking review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Dislike a review
const dislikeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const product = await Product.findOne({ "reviews._id": reviewId });

    if (!product) {
      return res.status(404).json({ message: "Review not found" });
    }

    const review = product.reviews.id(reviewId);

    // Prevent multiple dislikes by the same user
    if (review.dislikedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You already disliked this review" });
    }

    // Remove user from likes if they had liked it
    review.likedBy = review.likedBy.filter(
      (id) => id.toString() !== userId.toString()
    );
    review.likes = review.likedBy.length;

    // Add user to dislikes
    review.dislikedBy.push(userId);
    review.dislikes = review.dislikedBy.length;

    await product.save();

    res.status(200).json({ message: "Review disliked successfully", review });
  } catch (error) {
    console.error("Error disliking review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addReview,
  getReviews,
  likeReview,
  dislikeReview,
};
