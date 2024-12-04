const Product = require("../models/productModel"); // Import the Product model
const cloudinary = require("../config/cloudinary");

// Create a new product with images uploaded to Cloudinary
const createProduct = async (req, res) => {
  console.log(req.body);

  try {
    const {
      title,
      brand,
      seller,
      price,
      offerPrice,
      discountPercentage,
      variants,
      stock,
      subSubcategoryId,
      description,
      warranty,
      sizes,
      rating,
      specifications,
      delivery,
      colors,
    } = req.body;

    // Basic validation
    if (!title || !price || !stock) {
      return res.status(400).json({
        success: false,
        message: "Title, price, and stock are required fields.",
      });
    }

    // Parse variants to ensure it's an array of objects
    let parsedVariants = variants ? JSON.parse(variants) : [];

    // Correct mapping of variants to be stored in the database
    parsedVariants = parsedVariants.map((variant) => ({
      ram: variant.ram,
      storage: variant.storage,
      price: parseFloat(variant.price) || 0,
      offerPrice: parseFloat(variant.offerPrice) || 0,
      discountPercentage: parseInt(variant.discountPercentage) || 0,
    }));

    const productCardImage = req.files.cardImage
      ? req.files.cardImage[0].path
      : null;

    if (!productCardImage) {
      return res
        .status(400)
        .json({ success: false, message: "Product card image is required." });
    }

    // Convert input values for pricing, stock, and rating
    const productPrice = parseFloat(price);
    const productDiscountPercentage = parseInt(discountPercentage);
    const productOfferPrice = parseFloat(offerPrice);
    const productStock = parseInt(stock);
    const productRating = parseFloat(rating);

    // Parse specifications if provided
    const parsedSpecifications = specifications
      ? JSON.parse(specifications)
      : {};

    // Upload the product card image to Cloudinary
    const result = await cloudinary.uploader.upload(productCardImage, {
      folder: "product card image",
      use_filename: true,
      unique_filename: false,
    });

    // Structure colors and their images (upload each color's images to Cloudinary)
    const structuredColors = await Promise.all(
      colors.map(async (color, index) => {
        const colorImagesKey = `colors[${index}][images]`;
        const colorImages = req.files[colorImagesKey] || [];

        if (colorImages.length === 0) {
          return res.status(400).json({
            success: false,
            message: `No images provided for color ${color.colorName}`,
          });
        }

        const uploadPromises = colorImages.map((file) =>
          cloudinary.uploader.upload(file.path, {
            folder: "products Details Image",
            use_filename: true,
            unique_filename: false,
          })
        );

        const uploadedImages = await Promise.all(uploadPromises);

        const imageUrls = uploadedImages.map((result) => result.secure_url);

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
      offerPrice: productOfferPrice,
      discountPercentage: productDiscountPercentage,
      variants: parsedVariants,
      stock: productStock,
      subSubcategoryId,
      description,
      warranty,
      sizes,
      rating: productRating,
      specifications: parsedSpecifications,
      delivery: {
        estimatedDays: delivery.estimatedDays,
        cost: delivery.cost,
      },
      cardImage: result.secure_url,
      colors: structuredColors,
    });

    console.log("newProduct", newProduct);

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

const getRelatedProducts = async (req, res) => {
  try {
    const { subsubcategoryId } = req.params;

    // Fetch related products based on the subsubcategoryId
    const relatedProducts = await Product.find({
      subSubcategoryId: subsubcategoryId,
    }).select("cardImage title price offerPrice discountPercentage rating"); // Select specific fields

    // If no products found, return a 404 status
    if (relatedProducts.length === 0) {
      return res.status(404).json({ message: "No related products found." });
    }

    // Send the related products in the response
    return res.status(200).json(relatedProducts);
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
  getRelatedProducts,
};
