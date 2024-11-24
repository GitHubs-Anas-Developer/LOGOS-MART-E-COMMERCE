const express = require("express");
const {
  createOrder,
  verifyPayment,
  getOrdersList,
  getOrderDetails,
} = require("../controller/orderController");
const router = express.Router();

// Route for creating an order
router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);
router.get("/orders/list/:userId", getOrdersList);
router.get("/order-details/:orderId", getOrderDetails);

module.exports = router;
