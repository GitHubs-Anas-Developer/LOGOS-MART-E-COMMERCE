const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Assuming you have a 'Category' model to link the subcategory to
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

module.exports = mongoose.model("Subcategory", subcategorySchema);
