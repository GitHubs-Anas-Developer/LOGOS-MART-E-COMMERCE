const express = require("express");
const {
  addToCart,
  getUserCart,
  cartRemoveOne,
  cartClearAll,
  CartUpdateQuantity,
} = require("../controller/cartController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express();

router.post("/add/cart", authMiddleware, addToCart);
router.get("/cart", authMiddleware, getUserCart);
router.put("/cart/update-quantity", authMiddleware, CartUpdateQuantity);
router.delete("/cart/delete", authMiddleware, cartRemoveOne);
router.delete("/cart/clear", authMiddleware, cartClearAll);

module.exports = router;
