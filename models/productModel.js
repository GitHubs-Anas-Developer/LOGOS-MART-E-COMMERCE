const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema(
  {
    title: { type: String },
    brand: { type: String },
    seller: { type: String },
    price: { type: Number },
    offerPrice: { type: Number },
    discountPercentage: { type: Number },

    subSubcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSubcategory",
      required: true,
    },
    description: { type: String },
    specifications: [
      {
        type: Map,
        of: String, // Each key in the map will have a string value
      },
    ],

    stock: { type: Number, required: true, min: 0 },
    ram: { type: String },
    storageSize: { type: String },
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
    averageRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
