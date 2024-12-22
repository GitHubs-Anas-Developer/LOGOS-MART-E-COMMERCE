const express = require("express");
const { getFilterProducts, getBrands } = require("../controller/filterProductsController");

const router = express.Router();

router.get("/filter/products", getFilterProducts);
router.get("/brands", getBrands);


module.exports = router;
