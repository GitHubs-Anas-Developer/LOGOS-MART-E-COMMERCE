const favoriteModel = require("../models/favoritesModel");
const mongoose = require("mongoose");

const addToFavorite = async (req, res) => {
  try {
    
    const { userId } = req.params;
    const { productId } = req.body;

    const existingFavorite = await favoriteModel.findOne({ userId, productId });

    if (existingFavorite) {
      // If product already exists in favorites, return a message or handle accordingly
      return { success: false, message: "Product is already in favorites." };
    }

    // If not, create a new favorite
    const newFavorite = new favoriteModel({
      userId,
      productId,
    });

    await newFavorite.save();

    return {
      success: true,
      message: "Product added to favorites successfully!",
    };
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getFavorites = async (req, res) => {
  const { userId } = req.params;

  // Validate if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const favorites = await favoriteModel
      .find({ userId })
      .populate("productId", "title cardImage");

    res.json({ favorites: favorites });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteFavorite = async (req, res) => {
  try {
    const { userId } = req.params;

    const { productId } = req.body;

 
    // Remove the specified product from the user's favorites
    const deletedFavorite = await favoriteModel.findOneAndDelete({
      userId,
      productId,
    });

    if (!deletedFavorite) {
      return res.status(404).json({
        success: false,
        message: "Favorite product not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product removed from favorites successfully!",
    });
  } catch (error) {
    console.error("Error deleting favorite:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const deleteAllFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    // Remove all favorites for the specified user
    await favoriteModel.deleteMany({ userId });

    return res.status(200).json({
      success: true,
      message: "All favorite products removed successfully!",
    });
  } catch (error) {
    console.error("Error deleting all favorites:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addToFavorite,
  getFavorites,
  deleteFavorite,
  deleteAllFavorites,
};
