const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a category title"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Please upload a category image"],
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

module.exports = mongoose.model("Category", categorySchema);
