const mongoose = require("mongoose");

const carouselBannerSchema = new mongoose.Schema(
  {
    images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model("CarouselBanner", carouselBannerSchema);
