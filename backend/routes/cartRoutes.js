const express = require("express");
const {
  addToCart,
  getUserCart,
  cartRemoveOne,
} = require("../controller/cartController");

const router = express();

router.post("/add/cart", addToCart);
router.get("/cart/:userId", getUserCart);
router.delete("/cart/delete/:userId", cartRemoveOne);

module.exports = router;
