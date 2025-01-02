const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  title: {
    type: String,
    maxlength: 150, // Optional short title
  },
  comment: {
    type: String,
    maxlength: 2000, // Detailed review comment
  },
  images: [
    {
      type: String, // URL of uploaded images
    },
  ],

  likes: {
    type: Number,
    default: 0, // Count of likes
  },
  dislikes: {
    type: Number,
    default: 0, // Count of dislikes
  },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Array of user IDs who liked the review
    },
  ],
  dislikedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Array of user IDs who disliked the review
    },
  ],

  attributeRatings: {
  
    valueforMoney: { type: Number, default: 0 },
    quality: { type: Number, default: 0 },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

const productSchema = new mongoose.Schema(
  {
    subSubcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSubcategory",
      required: true,
    },
    title: { type: String },
    brand: { type: String },
    seller: { type: String },
    price: { type: Number, default: 0 },
    offerPrice: { type: Number, default: 0 },
    discountPercentage: { type: Number, default: 0 },
    variants: [
      {
        ram: { type: String }, // e.g., "8GB", "12GB"
        storage: { type: String }, // e.g., "128GB", "256GB"
        price: { type: Number, default: 0 }, // Price for this configuration
        offerPrice: { type: Number, default: 0 }, // Discounted price, if any
        discountPercentage: { type: Number, default: 0 }, // Discount percentage
      },
    ],
    highlights: [
      {
        type: Map,
        of: String,
      },
    ],

    about: {
      type: [String], // This will create an array of strings
      default: [], // Default to an empty array if no value is provided
    },

    description: { type: String },

    specifications: [
      {
        type: Map,
        of: String, // Each key in the map will have a string value
      },
    ],

    stock: { type: Number, required: true, min: 0 },
    warranty: { type: String },
    delivery: {
      estimatedDays: { type: Number, default: 5 },
      cost: { type: Number, default: 0 },
    },
    sizes: { type: [String] }, // Array of available sizes
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    cardImage: {
      type: String,
    },
    colors: [
      {
        colorName: { type: String }, // e.g., "Red" or "Green"
        hexCode: { type: String }, // e.g., "#FF0000" for Red
        images: [{ type: String }], // Array of image URLs for each color variant
      },
    ],
    reviews: [reviewSchema],
    reviewCount: { type: Number },
  },
  { timestamps: true }
);

productSchema.methods.updateReviewStats = async function () {
  const totalReviews = this.reviews.length;

  this.reviewCount = totalReviews;

  await this.save();
};

module.exports = mongoose.model("Product", productSchema);
