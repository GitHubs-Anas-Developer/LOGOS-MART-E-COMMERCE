import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OrderContext from "../../context/Orders";
import { useNavigate } from "react-router-dom"; // If you want to navigate after payment success
import api from "../../utils/axiosInstance";

function MyOrderDetails() {
  const { id } = useParams(); // Get the order ID from URL params
  const { fetchOrderDetails, orderDetails, loading, error } =
    useContext(OrderContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  // Fetch order details when component mounts
  useEffect(() => {
    fetchOrderDetails(id); // Fetch order details based on the ID
  }, [id]);

  const handlePayment = async () => {
    setIsLoading(true); // Start loading

    try {
      const options = {
        key: "rzp_test_tVu7a5I4APk2GW", // Your Razorpay test key
        amount: orderDetails.totalAmount * 100, // Convert to paise
        currency: "INR",
        name: orderDetails.productId?.title || "Product Title",
        order_id: orderDetails.razorpayOrderId,
        handler: async (response) => {
          try {
            // Verify payment on your server
            const paymentVerification = await api.post(
              `/api/v1/verify-payment`,
              {
                razorpayOrderId: orderDetails.razorpayOrderId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }
            );

            toast.success("Payment successful!");
            navigate("/orderSuccess", { state: response.razorpay_payment_id }); // Navigate to success page
          } catch (error) {
            console.error("Error saving payment:", error);
            toast.error(
              "Failed to save payment details. Please contact support."
            );
          }
        },
        prefill: {
          name: orderDetails.addressId?.name || "John Doe",
          email: orderDetails.addressId?.email || "johndoe@example.com",
          contact: orderDetails.addressId?.phoneNumber || "9999999999",
        },
        theme: { color: "#4CAF50" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg animate-pulse">
          Loading order details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Order not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
        Order Details
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-shrink-0">
            {orderDetails.productId?.cardImage && (
              <img
                src={orderDetails.productId.cardImage}
                alt="Product"
                className="w-40 h-auto object-contain"
              />
            )}
          </div>

          <div className="mt-4 md:mt-0 md:ml-6 flex-1">
            <h2 className=" font-semibold text-gray-800">
              {orderDetails.productId?.title || "Product Title"}
            </h2>
            <p className="text-sm text-gray-500">
              Order ID: {orderDetails.razorpayOrderId}
            </p>
            <p className="text-sm text-gray-500">
              Ordered on:{" "}
              {new Date(orderDetails.createdAt).toLocaleDateString("en-IN")}
            </p>

            {/* Display Address Name (addressId.name) */}
            {orderDetails.addressId && (
              <div className="mt-6 p-4 border border-gray-200 bg-gray-50 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700">
                  Shipping Address
                </h3>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Name: </span>
                  {orderDetails.addressId.name}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Address: </span>
                  {orderDetails.addressId.street}, {orderDetails.addressId.city}
                  , {orderDetails.addressId.state} -{" "}
                  {orderDetails.addressId.postalCode}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Phone: </span>
                  {orderDetails.addressId.phoneNumber}
                </p>
              </div>
            )}

            <div className="mt-4 ">
              <p className="text-sm text-gray-600">
                Quantity: {orderDetails.quantity}
              </p>
              <p className="text-sm text-gray-600">
                Price: ₹{orderDetails.productId?.price}
              </p>
              <p className="text-sm text-gray-600">
                Tax: ₹{orderDetails.taxPrice}
              </p>
              <p className="text-sm text-gray-600">
                Delivery: ₹{orderDetails.deliveryCharge}
              </p>
              <p className="text-lg font-bold text-gray-800 mt-2">
                Total: ₹{orderDetails.totalAmount}
              </p>
            </div>

            <div className="mt-6 space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Status: </span>
                <span
                  className={`font-semibold ${
                    orderDetails.orderStatus === "Delivered"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {orderDetails.orderStatus}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Payment Status: </span>
                <span
                  className={`font-semibold ${
                    orderDetails.paymentStatus === "Paid"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {orderDetails.paymentStatus}
                </span>
              </p>
            </div>

            {/* Pay Now Button */}
            {orderDetails.paymentStatus !== "Paid" && (
              <div className="mt-8 text-center">
                <button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-blue-700 focus:outline-none disabled:opacity-50"
                >
                  {isLoading ? "Processing..." : "Pay Now"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyOrderDetails;
