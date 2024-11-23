const mongoose = require("mongoose");

const favoritesSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    }, // Reference to the Product model
    addedAt: { type: Date, default: Date.now }, // Date when the product was added to favorites
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    }, // Reference to the User model, showing which user favorited the product
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

module.exports = mongoose.model("Favorite", favoritesSchema);
