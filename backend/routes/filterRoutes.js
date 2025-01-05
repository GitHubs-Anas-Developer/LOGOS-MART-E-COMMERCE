const express = require("express");
const {
  getFilterProducts,
  getBrands,
  searchItems,
  fetchUnderPriceProducts,
} = require("../controller/filterProductsController");

const router = express.Router();

router.get("/filter/products", getFilterProducts);
router.get("/brands", getBrands);

router.get("/search/itmes", searchItems);

router.get(`/under-price/products/:price`, fetchUnderPriceProducts);

module.exports = router;
