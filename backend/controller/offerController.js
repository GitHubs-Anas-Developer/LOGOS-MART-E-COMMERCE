const products = require("../models/productModel");

const OfferProducts = async (req, res) => {
  try {
    // Query for different discount ranges
    const [specialOffer, discount30to40, discount40to50] = await Promise.all([
      // Products with discounts between 50% and 90% on the main product or within variants
      products.find({
        $or: [
          { discountPercentage: { $gte: 50, $lte: 60 } },
          {
            variants: {
              $elemMatch: {
                discountPercentage: { $gte: 50, $lte: 60 },
              },
            },
          },
        ],
      }),
      // Products with variants offering 30%-40% discount
      products.find({
        $or: [
          { discountPercentage: { $gte: 30, $lte: 40 } },
          {
            variants: {
              $elemMatch: {
                discountPercentage: { $gte: 30, $lte: 40 },
              },
            },
          },
        ],
      }),
      // Products with variants offering 40%-50% discount
      products.find({
        $or: [
          { discountPercentage: { $gte: 40, $lte: 50 } },
          {
            variants: {
              $elemMatch: {
                discountPercentage: { $gte: 40, $lte: 50 },
              },
            },
          },
        ],
      })
    ]);

    // Return response
    res.json({
      message: "Offer products retrieved successfully",
      specialOffer,
      discount30to40,
      discount40to50,
    });
  } catch (error) {
    console.error("Error fetching offer products:", error);
    res.status(500).json({
      message: "Server error while retrieving offer products",
      error: error.message,
    });
  }
};

const fetchBigDeals = async (req, res) => {
  try {
    const bigDeals = await products.find({
      $or: [
        {
          discountPercentage: { $gte: 60, $lte: 90 },
        },
        {
          variants: {
            $elemMatch: {
              discountPercentage: { $gte: 60, $lte: 90 },
            },
          },
        },
      ],
    }).select("cardImage title")

    res.json({
      message: "big deals products retrieved successfully",
      bigDeals: bigDeals,
    });
  } catch (error) {
    console.error("Error fetching big deals products:", error);
    res.status(500).json({
      message: "Server error while retrieving big deals products",
      error: error.message,
    });
  }
};

module.exports = {
  OfferProducts,
  fetchBigDeals,
};
