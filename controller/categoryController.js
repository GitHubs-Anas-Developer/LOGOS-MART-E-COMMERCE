const categoryModels = require("../models/categoryModel");
const cloudinary = require("../config/cloudinary"); // Import your Cloudinary config

const createCategory = async (req, res) => {
  const { title } = req.body;
  const image = req.file ? req.file.path : null;

  // Check for missing fields
  if (!title || !image) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(image, {
      folder: "categories",
      use_filename: true,
      unique_filename: false,
    });

    // Create a new category instance
    const newCategory = new categoryModels({
      title,
      image: result.secure_url, // Store the Cloudinary URL
    });

    // Save the new category to the database
    await newCategory.save();

    // Respond with the created category
    return res.status(201).json({
      message: "Category created successfully!",
      category: newCategory,
    });
  } catch (error) {
    // Handle errors and respond appropriately
    console.error(error);
    return res.status(500).json({
      message: "Error creating category",
      error: error.message,
    });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const categories = await categoryModels.find();

    // Check if no categories are found
    if (categories.length === 0) {
      return res.status(404).json({
        message: "No categories found", // Respond with a message if there are no categories
      });
    }

    // If categories are found, send them in the response
    return res.status(200).json({
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    // Handle errors and respond appropriately
    console.error(error);
    return res.status(500).json({
      message: "Error getting all categories",
      error: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getAllCategory,
};
