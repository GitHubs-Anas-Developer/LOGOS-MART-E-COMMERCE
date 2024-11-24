const express = require("express");
const { getFilterProducts } = require("../controller/filterProductsController");

const router = express.Router();

router.get("/filter/products", getFilterProducts);

module.exports = router;
