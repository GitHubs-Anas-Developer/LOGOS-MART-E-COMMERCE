const express = require("express");
const {
  createOrder,
  verifyPayment,
  getOrdersList,
  getOrderDetails,
  fetchPaymentProduct,
} = require("../controller/orderController");
const router = express.Router();

// Route for creating an order
router.get("/product/payment", fetchPaymentProduct);
router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);
router.get("/orders/list/:userId", getOrdersList);
router.get("/order-details/:orderId", getOrderDetails);

module.exports = router;
