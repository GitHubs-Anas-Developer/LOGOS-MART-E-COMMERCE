const productImageModel = require("../models/productImagesModels");
const cloudinary = require("../config/cloudinary"); // Import Cloudinary configuration

const createNewProductImages = async (req, res) => {
  try {
    // Check if files exist
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const productId = req.body.productId;

    // Upload images to Cloudinary
    const imagePromises = req.files.map((file) =>
      cloudinary.uploader.upload(file.path, {
        folder: "product_images", // Optional: specify folder on Cloudinary
      })
    );

    // Wait for all images to be uploaded
    const uploadResults = await Promise.all(imagePromises);

    // Map through upload results to get image URLs
    const imageUrls = uploadResults.map((result) => result.secure_url);

    // Create new product image record in the database
    const newProductImages = new productImageModel({
      productId,
      images: imageUrls, // Save the URLs in the database
    });

    await newProductImages.save();

    return res.status(201).json({
      message: "Product images uploaded successfully",
      productImages: newProductImages,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getProductImages = async (req, res) => {
  try {
    // Get the productId from request params
    const { productId } = req.params;

    // Find the product images by productId
    const productImages = await productImageModel.findOne({ productId });
    console.log("productImages", productImages);

    // If no images are found, send an error
    if (!productImages) {
      return res.status(404).json({ message: "Product images not found" });
    }

    // If images are found, return the data
    return res.status(200).json({
      message: "Product images fetched successfully",
      images: productImages.images, // Return the array of image URLs
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createNewProductImages,
  getProductImages,
};
