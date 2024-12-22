const mongoose = require("mongoose");

const ProductImagesSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId, // Corrected type declaration
    ref: "Product", // Reference to the Product model
    required: true,
  },
  images: [
    {
      type: String, // URLs or paths to the images
      required: true,
    },
  ],
});

module.exports = mongoose.model("ProductImages", ProductImagesSchema);
