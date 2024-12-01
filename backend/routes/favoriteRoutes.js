const express = require("express");
const {
  addToFavorite,
  getFavorites,
  deleteFavorite,
  deleteAllFavorites,
} = require("../controller/favoriteController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add a product to favorites
router.post("/add/favorite", authMiddleware, addToFavorite);

// Get all favorite products for a user
router.get("/favorites/:userId", getFavorites);

// Delete a single favorite product for a user
router.delete("/delete/favorite/:userId", deleteFavorite);

// Delete all favorite products for a user
router.delete("/delete/all/favorite/:userId", deleteAllFavorites);

module.exports = router;
