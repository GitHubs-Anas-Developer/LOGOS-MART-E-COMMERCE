const productModels = require("../models/productModel");

const getFilterProducts = async (req, res) => {
  try {
    const { rating, priceRange, sortOption } = req.query;

    const filter = {};
    if (rating) {
      filter.rating = { $gte: Number(rating) };
    }
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split("-");
      filter.price = {
        $gte: Number(minPrice),
        $lte: Number(maxPrice),
      };
    }

    // Build sort options based on sortOption value
    let sort = {};
    switch (sortOption) {
      case "priceLowHigh":
        sort.price = 1; // Ascending order
        break;
      case "priceHighLow":
        sort.price = -1; // Descending order
        break;
      case "rating":
        sort.rating = -1; // Highest rating first
        break;
      case "title":
        sort.title = 1; // Alphabetical order
        break;
      default:
        break;
    }

    // Fetch and sort products from the database
    const products = await productModels.find(filter).sort(sort);

    return res.status(200).json({ filterProducts: products });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = { getFilterProducts };
