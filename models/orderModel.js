const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    price: {
      type: Number,
    },
    taxPercentage: {
      type: String, // You can change this to Number if necessary
      default: 10,
    },
    taxPrice: {
      type: Number, // You can change this to Number if necessary
      required: true,
    },
    deliveryCharge: {
      // New field for delivery charge
      type: Number,
      required: true,
      default: 0, // Default value is 0, can be changed depending on the logic
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    paymentMode: {
      type: String,
      enum: ["COD", "Online"],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    razorpayOrderId: {
      type: String,
    },
    razorpayPaymentId: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
