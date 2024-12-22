const express = require("express");
const router = express.Router();

// Import the Multer middleware for handling file uploads
const upload = require("../middleware/Multer");

// Import the controller for creating product images
const { createNewProductImages, getProductImages } = require("../controller/productImagesController");

// Route for uploading product images
router.post("/product-images", upload.array("images", 20), createNewProductImages);
router.get("/product-images/:productId", getProductImages);


module.exports = router;
