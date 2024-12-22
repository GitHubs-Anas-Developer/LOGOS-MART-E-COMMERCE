const crypto = require("crypto");
const razorpayInstance = require("../config/razorpay");
const Order = require("../models/orderModel");
const product = require("../models/productModel");

const fetchPaymentProduct = async (req, res) => {
  try {
    const { productId, productColorId, productRamStorageId } = req.query;

    // Validate that required parameters are provided
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const productDetails = await product.findById(productId);

    const colors = productDetails.colors || [];
    const ramStorage = productDetails.variants || [];

    // Find the selected color variant (or null if not found)
    const selectedColorVariant = productColorId
      ? colors.find((color) => color._id.toString() === productColorId)
      : null;

    // Find the selected RAM and storage variant (or null if not found)
    const selectedRamStorageVariant = productRamStorageId
      ? ramStorage.find(
          (variant) => variant._id.toString() === productRamStorageId
        )
      : null;

    // Construct response data
    const responseData = {
      title: productDetails.title,

      // Use selectedColorVariant image if it exists, otherwise fallback to cardImage
      image: selectedColorVariant?.images?.[0] || productDetails.cardImage,

      price: selectedRamStorageVariant?.price || productDetails.price,

      // Use selectedRamStorageVariant offerPrice if available, otherwise fallback
      offerPrice:
        selectedRamStorageVariant?.offerPrice || productDetails.offerPrice,
    };

    res.status(200).json({ paymentProduct: responseData });
  } catch (error) {
    console.error("Error fetching product details:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createOrder = async (req, res, next) => {
  const {
    productId,
    userId,
    amount,
    addressId,
    tax,
    deliveryCost,
    quantity,
    listPrice,
    extraDiscountPrice,
  } = req.body;

  const orderOptions = {
    amount: amount * 100, // Convert to paise
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
  };

  try {
    const razorpayOrder = await razorpayInstance.orders.create(orderOptions);

    // Save order details in the database
    const order = new Order({
      userId,
      productId,
      addressId,
      taxPrice: tax,
      deliveryCharge: deliveryCost,
      quantity,
      listPrice,
      extraDiscountPrice,
      totalAmount: amount,
      orderStatus: "Pending",
      paymentStatus: "Pending",
      paymentMode: "Online",
      razorpayOrderId: razorpayOrder.id,
    });

    await order.save();
    return res.status(201).json({ order: razorpayOrder, dbOrder: order });
  } catch (error) {
    next(error); // Pass error to middleware
  }
};

const verifyPayment = async (req, res, next) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Generate HMAC to verify the signature
    const body = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return res
        .status(400)
        .json({ message: "Signature mismatch, possible tampering detected." });
    }

    // Update order status in the database
    const order = await Order.findOneAndUpdate(
      { razorpayOrderId },
      { paymentStatus: "Paid", orderStatus: "Confirmed", razorpayPaymentId },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    return res
      .status(200)
      .json({ message: "Payment verified successfully.", order });
  } catch (error) {
    next(error); // Pass error to middleware
  }
};

const getOrdersList = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId: userId })
      .populate("productId", "title price cardImage") // Customize what to populate
      .populate("addressId", "addressLine city state");

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    return res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching the orders." });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Validate the orderId
    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required." });
    }

    // Fetch order details from the database
    const orderDetails = await Order.findOne({ _id: orderId })
      .populate("productId", "title price cardImage") // Customize what to populate
      .populate("addressId");

    // Handle case where the order is not found
    if (!orderDetails) {
      return res.status(404).json({ message: "Order not found." });
    }

    // Send the order details as a response
    return res
      .status(200)
      .json({ message: "Order fetched successfully.", orderDetails });
  } catch (error) {
    console.error("Error fetching order details:", error);

    // Handle server errors
    return res.status(500).json({
      message: "An error occurred while fetching the order details.",
    });
  }
};
module.exports = {
  createOrder,
  verifyPayment,
  getOrdersList,
  getOrderDetails,
  fetchPaymentProduct,
};
