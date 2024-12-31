const express = require("express");
const {
  getFilterProducts,
  getBrands,
  searchItems,
} = require("../controller/filterProductsController");

const router = express.Router();

router.get("/filter/products", getFilterProducts);
router.get("/brands", getBrands);

router.get("/search/itmes", searchItems);

module.exports = router;
