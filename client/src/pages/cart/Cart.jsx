import React, { useContext, useEffect } from "react";
import CartContext from "../../context/Cart";
import { MdDelete } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

function Cart() {
  const { cart, cartDeleteOne, cartClearAll, updateCartQuantity } =
    useContext(CartContext);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  
  // Helper function to format price in INR (Indian Rupees)
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);

  if (!cart?.items?.length) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex flex-col items-center justify-center text-center py-24">
          <FaShoppingCart fontSize={70} className="text-gray-400 mb-6" />
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-500 mb-6">
            Browse through products and add them to your cart!
          </p>
          <button className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-6 py-3 rounded-full hover:bg-gradient-to-l transition-all">
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row">
          {/* Left Section: Cart Items */}
          <div className="w-full md:w-3/4 p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Your Shopping Cart
            </h2>
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.productId.cardImage}
                    alt={item.productId.title}
                    className="w-16 h-16 object-contain rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      {item.productId.title}
                    </h3>
                    <p className="text-gray-500">
                      {formatPrice(item.productId.price)}
                    </p>
                    <div className="flex items-center mt-2 space-x-3">
                      <button
                        className="bg-gray-200 rounded-full p-2 text-gray-600 hover:bg-gray-300"
                        onClick={() =>
                          updateCartQuantity(
                            item.productId._id,
                            item.quantity - 1
                          )
                        } // Decrement quantity
                      >
                        <AiOutlineMinus fontSize={18} />
                      </button>
                      <span className="text-lg font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        className="bg-gray-200 rounded-full p-2 text-gray-600 hover:bg-gray-300"
                        onClick={() =>
                          updateCartQuantity(
                            item.productId._id,
                            item.quantity + 1
                          )
                        } // Increment quantity
                      >
                        <AiOutlinePlus fontSize={18} />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  className="text-red-500 hover:text-red-700 transition-colors p-3 rounded-full"
                  onClick={() => cartDeleteOne(item.productId._id)}
                >
                  <MdDelete fontSize={24} />
                </button>
              </div>
            ))}
          </div>

          {/* Right Section: Total & Checkout */}
          <div className="w-full md:w-1/4 p-6 bg-gray-100 border-l">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Price Details
              </h3>
              <div className="flex justify-between items-center text-lg text-gray-700 mb-4">
                <span>Total Price</span>
                <span>{formatPrice(calculateTotal(cart.items))}</span>
              </div>
              <div className="flex justify-between items-center text-lg text-gray-700 mb-4">
                <span>Discount</span>
                <span className="text-green-600 font-semibold">-₹0.00</span>
              </div>
              <div className="flex justify-between items-center text-lg text-gray-700 mb-4">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold text-gray-800">
                <span>Total Amount</span>
                <span>{formatPrice(calculateTotal(cart.items))}</span>
              </div>
              <div className="flex flex-col space-y-4 mt-6">
                <button className="bg-teal-500 text-white rounded-full px-6 py-3 hover:bg-teal-600 transition-all">
                  Proceed to Checkout
                </button>
                <button
                  className="bg-red-500 text-white rounded-full px-6 py-3 hover:bg-red-600 transition-all"
                  onClick={cartClearAll}
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to calculate the total cost of the cart
const calculateTotal = (items) => {
  return items
    .reduce((total, item) => total + item.productId.price * item.quantity, 0)
    .toFixed(2);
};

export default Cart;
