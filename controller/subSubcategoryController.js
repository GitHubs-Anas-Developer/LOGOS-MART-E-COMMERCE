const SubSubcategoryModel = require("../models/subSubcategoryModel");
const cloudinary = require("../config/cloudinary");

const createSubSubcategory = async (req, res) => {
  try {
    // Destructure title and parent Subsubcategory from the request body
    const { title, subcategoryId } = req.body;

    console.log(req.body);

    // Handle image upload (if present)
    const image = req.file ? req.file.path : null;

    // Validate required fields
    if (!title || !subcategoryId || !image) {
      return res
        .status(400)
        .json({ message: "Title Subsubcategory and image are required" });
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: "subSubcategories",
      use_filename: true,
      unique_filename: false,
    });

    // Create a new SubSubcategory object
    const newSubSubcategory = new SubSubcategoryModel({
      title,
      parentSubcategory: subcategoryId,
      image: result.secure_url, // Store the filename of the uploaded image
    });

    await newSubSubcategory.save();

    // Send a success response
    return res.status(201).json({
      message: "SubSubcategory created successfully",
      subSubcategory: newSubSubcategory,
    });
  } catch (error) {
    // Handle errors and send a 500 response
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getAllSubSubctegory = async (req, res) => {
  try {
    const subSubcaregories = await SubSubcategoryModel.find();
    if (subSubcaregories.length === 0) {
      return res.status(404).json({
        message: "No subcategories found",
      });
    }

    return res.status(200).json({
      message: "Subsubcategories fetched successfully",
      subSubcategories: subSubcaregories, // Renamed for clarity
    });
  } catch (error) {
    // Handle errors and send a 500 response
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getSubsubcategoriesBySubcategory = async (req, res) => {
  try {
    const { subcategoryId } = req.params;

    const subSubcategories = await SubSubcategoryModel.find({
      parentSubcategory: subcategoryId,
    });

    if (subSubcategories.length === 0) {
      return res.status(404).json({
        message: "No subSubcategories found for this subcategory",
      });
    }
    return res.status(200).json({
      message: "Subcategories fetched successfully",
      subSubcategories,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
module.exports = {
  createSubSubcategory,
  getAllSubSubctegory,
  getSubsubcategoriesBySubcategory,
};
