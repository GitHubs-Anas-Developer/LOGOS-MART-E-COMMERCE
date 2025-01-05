const productModels = require("../models/productModel");

const getFilterProducts = async (req, res) => {
  try {
    const {
      rating,
      priceRange,
      sortOption,
      selectedBrand,
      limit = 10,
      page = 1,
    } = req.query;

    // Initialize filter object
    const filter = {};

    // Add filters
    if (rating) {
      if (isNaN(Number(rating))) {
        return res.status(400).json({ message: "Invalid rating format" });
      }
      filter.rating = { $gte: Number(rating) };
    }

    if (priceRange) {
      if (!/^\d+-\d+$/.test(priceRange)) {
        return res.status(400).json({ message: "Invalid price range format" });
      }
      const [minPrice, maxPrice] = priceRange.split("-");
      filter.price = {
        $gte: Number(minPrice),
        $lte: Number(maxPrice),
      };
    }

    if (Array.isArray(selectedBrand)) {
      filter.brand = {
        $in: selectedBrand.map(
          (brand) =>
            brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase() // Capitalize first letter
        ),
      };
    }

    // Build sort options
    let sort = {};
    switch (sortOption) {
      case "priceLowHigh":
        sort.price = 1;
        break;
      case "priceHighLow":
        sort.price = -1;
        break;
      case "rating":
        sort.rating = -1;
        break;
      case "title":
        sort.title = 1;
        break;
      default:
        break;
    }

    // Pagination
    const limitNum = Number(limit);
    const pageNum = Number(page);
    const skip = (pageNum - 1) * limitNum;

    // Fetch filtered and sorted products with pagination
    const products = await productModels
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    // Fetch total count for pagination metadata
    const totalProducts = await productModels.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limitNum);

    return res.status(200).json({
      filterProducts: products,
      totalProducts,
      currentPage: pageNum,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getBrands = async (req, res) => {
  try {
    // Fetch unique brands from the database
    const brands = await productModels.distinct("brand");
    const productBrands = brands.map((brand) => brand.toUpperCase());

    console.log(productBrands);
    // Send the response
    return res.status(200).json({ success: true, brands: productBrands });
  } catch (error) {
    console.error("Error fetching brands:", error.message);

    // Send error response
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const searchItems = async (req, res) => {
  try {
    const query = req.query.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query parameter is missing",
      });
    }

    // Build the search query
    const searchQuery = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
      ],
    };

    // Fetch matching items
    const items = await productModels
      .find(searchQuery)
      .select("title cardImage subSubcategoryId brand");

    console.log("Fetched Items:", items);

    return res.status(200).json({ success: true, items });
  } catch (error) {
    console.error("Error fetching Items:", error.message);

    // Send error response
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

fetchUnderPriceProducts = async (req, res) => {
  try {
    const { price } = req.params;

    console.log("price", price);

    // Validate price input
    if (!price || isNaN(price)) {
      return res.status(400).json({
        success: false,
        message: "Invalid price parameter",
      });
    }

    const maxPrice = parseInt(price);  // Maximum price from URL parameter
    const minPrice = 1; // Default minimum price

    // Fetch products under the specified price range
    const products = await productModels
      .find({
        offerPrice: { $gte: minPrice, $lte: maxPrice },  // Price filter
      })
      .select("title price offerPrice discountPercentage cardImage rating variants reviews");

    // Check if products exist
    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found under this price",
      });
    }

    // Respond with fetched products
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


module.exports = {
  getFilterProducts,
  getBrands,
  searchItems,
  fetchUnderPriceProducts,
};
