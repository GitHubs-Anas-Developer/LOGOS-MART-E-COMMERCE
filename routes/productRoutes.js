const express = require("express");
const {
  createProduct,
  getProducts,
  getSingleProductDetails,
  getSubsubcategoryProducts,
} = require("../controller/productController");
const upload = require("../middleware/Multer");

const router = express.Router();

router.post(
  "/create/product",
  upload.fields([
    { name: "cardImage", maxCount: 1 },
    { name: "colors[0][images]", maxCount: 50 },
    { name: "colors[1][images]", maxCount: 50 },
    { name: "colors[2][images]", maxCount: 50 },
    { name: "colors[3][images]", maxCount: 50 },
    { name: "colors[4][images]", maxCount: 50 },
  ]),
  createProduct
);

router.get("/products", getProducts);
router.get("/product/details/:productId", getSingleProductDetails);
router.get(
  "/products/subsubcategory/:subsubcategoryId",
  getSubsubcategoryProducts
);

module.exports = router;
