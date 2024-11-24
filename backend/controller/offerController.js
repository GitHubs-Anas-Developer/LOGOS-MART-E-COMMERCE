const products = require("../models/productModel");

const OfferProducts = async (req, res) => {
  try {
    const discount30to40 = await products.find({
      discountPercentage: { $gte: 30, $lte: 40 },
    });
    const discount40to50 = await products.find({
      discountPercentage: { $gte: 40, $lte: 50 },
    });

    if (!discount30to40.length && !discount40to50.length) {
      return res.status(404).json({
        message: "No products found with a discount between 30% and 50%",
      });
    }

    res.json({
      message: "Offer products retrieved successfully",
      discount30to40: discount30to40,
      discount40to50: discount40to50,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  OfferProducts,
};
