const cloudinary = require("../config/cloudinary");
const CarouselBannerModel = require("../models/carouselBannerModel");

const createCarouselBanner = async (req, res) => {
  console.log("Uploaded files:", req.files);

  try {
    // Check if files are uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadedImages = [];

    // Upload each file to Cloudinary
    for (const file of req.files) {
      try {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "carousel_banners", // Folder for organization
          resource_type: "image", // Ensure only images are uploaded
        });

        // Collect secure URLs for database or response
        uploadedImages.push(result.secure_url);
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({
          message: "Error uploading to Cloudinary",
          error: uploadError.message,
        });
      }
    }

    // Save image URLs to the database
    const carouselBanner = await CarouselBannerModel.create({
      images: uploadedImages,
    });

    // Respond with the created banner
    res.status(201).json({
      message: "Carousel banner created successfully",
      data: carouselBanner,
    });
  } catch (error) {
    console.error("Error creating carousel banner:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllCarouselBanners = async (req, res) => {
  try {
    const banners = await CarouselBannerModel.find();
    res.status(200).json({
      message: "Carousel banners fetched successfully",
      banners: banners,
    });
  } catch (error) {
    console.error("Error fetching carousel banners:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createCarouselBanner,
  getAllCarouselBanners,
};
