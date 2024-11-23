const Product = require("../models/productModel"); // Import the Product model
const cloudinary = require("../config/cloudinary");

// Create a new product with images uploaded to Cloudinary
const createProduct = async (req, res) => {
  try {
    const {
      title,
      brand,
      seller,
      price,
      offerPrice,
      discountPercentage,
      stock,
      subSubcategoryId,
      description,
      ram,
      storageSize,
      warranty,
      sizes,
      rating,
      specifications,
      delivery,
      colors,
    } = req.body;

    const productCardImage = req.files.cardImage[0].path;

    // Convert input values
    const productPrice = parseInt(price);
    const productDiscountPercentage = parseInt(discountPercentage);
    const productOfferPrice = parseInt(offerPrice);
    const productStock = parseInt(stock);
    const productRating = parseFloat(rating);

    // Parse specifications
    const parsedSpecifications = JSON.parse(specifications || "{}");

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(productCardImage, {
      folder: "product card image",
      use_filename: true,
      unique_filename: false,
    });

    // Structure colors and their images
    const structuredColors = await Promise.all(
      colors.map(async (color, index) => {
        // Check for images for this specific color in req.files
        const colorImagesKey = `colors[${index}][images]`; // key format from req.files
        const colorImages = req.files[colorImagesKey] || [];

        // Upload each image for this color to Cloudinary
        const uploadPromises = colorImages.map((file) =>
          cloudinary.uploader.upload(file.path, {
            folder: "products Details Image",
            use_filename: true,
            unique_filename: false,
          })
        );

        // Wait for all images of this color to upload
        const uploadedImages = await Promise.all(uploadPromises);

        // Collect the secure URLs from the uploaded images for this color
        const imageUrls = uploadedImages.map((result) => result.secure_url);

        // Return structured color object with images
        return {
          colorName: color.colorName,
          hexCode: color.hexCode,
          images: imageUrls,
        };
      })
    );

    // Create the new product in the database
    const newProduct = new Product({
      title,
      brand,
      seller,
      price: productPrice,
      discountPercentage: productDiscountPercentage,
      offerPrice: productOfferPrice,
      stock: productStock,
      subSubcategoryId,
      description,
      ram,
      storageSize,
      warranty,
      sizes,
      rating: productRating,
      specifications: parsedSpecifications,
      delivery: {
        estimatedDays: delivery.estimatedDays,
        cost: delivery.cost,
      },
      cardImage: result.secure_url,
      colors: structuredColors, // Use structured colors with images
    });

    await newProduct.save();

    return res.status(201).json({
      success: true,
      data: newProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const productsAll = await Product.find();

    if (productsAll.length === 0) {
      return res.status(404).json({
        message: "No products found",
      });
    }

    // Send the products if found
    res.status(200).json({
      products: productsAll,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getSingleProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(404).json({
        message: "Product ID not found",
      });
    }
    const productDetails = await Product.findById(productId);

    if (!productDetails) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    return res.status(200).json({
      productDetails: productDetails,
    }); // Respond with product details if found
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getSubsubcategoryProducts = async (req, res) => {
  try {
    const { subsubcategoryId } = req.params;

    // Fetch products with the specified sub-subcategory ID
    const products = await Product.find({ subSubcategoryId: subsubcategoryId });

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found for this sub-subcategory.",
      });
    }

    return res.status(200).json({
      success: true,
      subsubcategoryProducts: products,
      message: "Products retrieved successfully!",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
module.exports = {
  createProduct,
  getProducts,
  getSingleProductDetails,
  getSubsubcategoryProducts,
};
