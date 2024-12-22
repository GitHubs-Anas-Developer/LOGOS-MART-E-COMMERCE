import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/Auth";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import api from "../../utils/axiosInstance";

// Utility function for cost calculation
const calculateCosts = (basePrice, quantity, deliveryCost, taxRate = 0.1) => {
  const tax = parseFloat(Math.floor(basePrice * quantity * taxRate).toFixed(2));
  const total = parseFloat(
    (basePrice * quantity + deliveryCost + tax).toFixed(2)
  );
  return { tax, total };
};

function OnlinePayment({ address }) {
  const [product, setProduct] = useState([]);
  const { userId } = useContext(AuthContext);
  const location = useLocation();

  const { productId, productColorId, productRamStorageId } =
    location.state || {};

  const fetchPaymentProduct = async () => {
    try {
      const response = await api.get("/api/v1/product/payment", {
        params: { productId, productColorId, productRamStorageId },
      });
      setProduct(response.data.paymentProduct); // Update state with product details
    } catch (error) {
      console.error("Failed to fetch product details:", error.message);
    }
  };

  useEffect(() => {
    if (productId) fetchPaymentProduct();
  }, []);

  console.log("product", product);

  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">
          No product details available for payment.
        </p>
      </div>
    );
  }

  const basePrice = product.offerPrice;

  const deliveryCost = product.delivery?.cost || 0;
  const { tax, total } = calculateCosts(basePrice, quantity, deliveryCost);
  const listPrice = product.price;

  console.log("listPrice", listPrice);

  const extraDiscountPrice = listPrice - basePrice;

  const handlePayment = async () => {
    if (quantity <= 0) {
      toast.error("Quantity must be at least 1.");
      return;
    }

    setIsLoading(true);

    console.log();

    try {
      // Create an order on the backend
      const { data } = await api.post(`/api/v1/create-order`, {
        productId: productId,
        userId,
        amount: total,
        addressId: address[0]?._id,
        tax,
        deliveryCost,
        quantity,
        listPrice,
        extraDiscountPrice,
      });

      // Configure Razorpay
      const options = {
        key: import.meta.env.RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: product.title,
        order_id: data.order.id,
        handler: async (response) => {
          try {
            await api.post(`/api/v1/verify-payment`, {
              razorpayOrderId: data.order.id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            toast.success("Payment successful!");
            navigate("/orderSuccess", { state: response.razorpay_payment_id });
          } catch (error) {
            console.error("Error saving payment:", error);
            toast.error(
              "Failed to save payment details. Please contact support."
            );
          }
        },
        prefill: {
          name: address[0]?.name || "John Doe",
          email: address[0]?.email || "johndoe@example.com",
          contact: address[0]?.phoneNumber || "9999999999",
        },
        theme: { color: "#4CAF50" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
              Payment Summary
            </h1>
            <div className="flex items-center gap-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-24 h-24 object-contain rounded-md"
              />
              <div>
                <h2 className="text-lg font-medium text-gray-700">
                  {product.title}
                </h2>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <span>Price (per item):</span>
                <span>₹{basePrice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Quantity:</span>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-16 px-2 py-1 border rounded-md text-center"
                />
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery Cost:</span>
                <span>₹{deliveryCost}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax (10%):</span>
                <span>₹{tax}</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-bold">
                <span>Total Amount:</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>
          <div className="p-6 flex justify-center">
            <button
              onClick={handlePayment}
              className={`bg-green-500 text-white py-2 px-6 rounded-lg ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-600"
              }`}
              disabled={isLoading || quantity <= 0}
            >
              {isLoading ? "Processing..." : `Pay ₹${total}`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OnlinePayment;
