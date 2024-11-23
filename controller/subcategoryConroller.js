const SubcategoryModel = require("../models/subcategoryModel");
const cloudinary = require("../config/cloudinary"); // Import your Cloudinary config

const createSubcategory = async (req, res) => {
  const { subcategory, categoryId } = req.body;

  const image = req.file ? req.file.path : null;

  console.log(req.body);

  // Check if all required fields are provided
  if (!subcategory || !image || !categoryId) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "subcategories",
      use_filename: true,
      unique_filename: false,
    });

    // Create a new subcategory instance
    const newSubcategory = new SubcategoryModel({
      parentCategory: categoryId, // Assuming 'categoryId' is the parent category ID from req.body
      title: subcategory,
      image: result.secure_url,
    });

    // Save the new subcategory to the database
    await newSubcategory.save();

    return res.status(201).json({
      message: "Subcategory created successfully",
      subcategory: newSubcategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error creating Subcategory",
      error: error.message,
    });
  }
};

const getAllSubcategory = async (req, res) => {
  try {
    const subcategoriesAll = await SubcategoryModel.find();

    if (subcategoriesAll.length === 0) {
      return res.status(404).json({
        message: "No subcategories found",
      });
    }

    return res.status(200).json({
      message: "Subcategories fetched successfully",
      subcategories: subcategoriesAll, // Renamed for clarity
    });
  } catch (error) {
    console.error("Error fetching subcategories:", error); // Enhanced error logging
    return res.status(500).json({
      message: "An error occurred while fetching subcategories",
      error: error.message,
    });
  }
};

const getSubcategoriesByCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const subcategories = await SubcategoryModel.find({
      parentCategory: categoryId,
    });
    // Check if subcategories exist
    if (subcategories.length === 0) {
      return res.status(404).json({
        message: "No subcategories found for this category",
      });
    }
    return res.status(200).json({
      message: "Subcategories fetched successfully",
      subcategories,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error fetching subcategories by category",
      error: error.message,
    });
  }
};

module.exports = {
  createSubcategory,
  getAllSubcategory,
  getSubcategoriesByCategory,
};
