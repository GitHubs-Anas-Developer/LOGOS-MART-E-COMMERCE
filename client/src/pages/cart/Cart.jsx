import React, { useContext, useEffect } from "react";
import CartContext from "../../context/Cart";
import { MdDelete } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { IoIosArrowRoundDown } from "react-icons/io";
import { SlEnergy } from "react-icons/sl";


function Cart() {
  const { cart, cartDeleteOne, cartClearAll, updateCartQuantity } =
    useContext(CartContext);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  console.log("cart", cart);


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
    <div className="container mx-auto ">
      <div className="bg-white l">
        <div className="flex flex-col md:flex-row">
          {/* Left Section: Cart Items */}
          <div className="w-full md:w-3/4 p-1 ">
            <h2 className="text-3xl font-bold text-blue-600 p-4 text-center bg-gray-100 ">
              My Cart
            </h2>

            {cart.items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-gray-50   shadow-sm hover:shadow-md transition-all border"
              >
                <div className="flex items-center  ">
                  <img
                    src={item.productId.cardImage}
                    alt={item.productId.title}
                    className="w-16 h-16 object-contain rounded-md border ml-1"
                  />
                  <div className=" pl-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                      {item.productId.title.length > 50 ? item.productId.title.slice(0, 60) + '...' : item.productId.title}
                    </h3>

                    <div className="flex items-center mt-2">
                      <p className="flex items-center border bg-green-500 text-white p-1 rounded">
                        <FaStar className="mr-1" /> {item.productId.rating}
                      </p>
                      <p className="ml-2 text-gray-600">({item.productId.reviews.length})</p>
                    </div>


                    <div className="flex items-center mt-2">
                      <p className="flex items-center text-green-500 font-bold">
                        <IoIosArrowRoundDown className="text-2xl " /> {item.productId.discountPercentage}%
                      </p>
                      <p className="pl-2 line-through font-extralight text-gray-500">
                        {formatPrice(item.productId.price)}
                      </p>
                      <p className="text-black font-bold pl-2">
                        {formatPrice(item.productId.offerPrice)}
                      </p>
                    </div>



                    <div className="flex items-center mt-2 space-x-4 w-fit border border-gray-300 rounded-md p-2 mb-2 bg-gray-100">
                      {item.quantity > 1 && (
                        <button
                          className="bg-blue-500 text-white rounded-lg p-2 shadow hover:bg-blue-600 transition duration-300"
                          onClick={() => updateCartQuantity(item.productId._id, item.quantity - 1)}
                        >
                          <AiOutlineMinus fontSize={18} />
                        </button>
                      )}

                      <span className="text-lg font-semibold text-gray-800">{item.quantity}</span>

                      <button
                        className="bg-purple-500 text-white rounded-lg p-2 shadow hover:bg-purple-600 transition duration-300"
                        onClick={() => updateCartQuantity(item.productId._id, item.quantity + 1)}
                      >
                        <AiOutlinePlus fontSize={18} />
                      </button>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 bg-gray-100 p-3 rounded-md border border-gray-300 w-fit mb-4">
                      {/* Delivery Cost Section */}
                      <div className="flex items-center space-x-2">
                        <p className="text-lg font-semibold text-gray-700">Delivery Cost:</p>
                        <p className={`text-lg font-semibold ${item.productId.delivery.cost === 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {item.productId.delivery.cost === 0 ? 'Free Delivery' : `₹${item.productId.delivery.cost}`}
                        </p>
                      </div>

                      {/* Estimated Delivery Time Section */}
                      <div>
                        <p className="text-sm text-gray-600">
                          Delivery time:{" "}
                          <strong className="text-green-600">
                            {new Date(
                              new Date().setDate(
                                new Date().getDate() + item.productId.delivery.estimatedDays
                              )
                            ).toLocaleDateString("en-US", {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </strong>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between space-x-4 p-2 w-full">
                      {/* Delete Button */}
                      <button
                        className="flex items-center justify-center text-red-500 hover:text-red-700 transition-colors p-3 rounded-md bg-black hover:bg-gray-800"
                        onClick={() => cartDeleteOne(item.productId._id)}
                        title="Remove item from cart"
                      >
                        <MdDelete fontSize={20} /> {/* Icon part */}
                        <span className="ml-2">Remove</span> {/* Text part */}
                      </button>

                      {/* Buy Button */}
                      <button
                        className="flex items-center justify-center bg-blue-500 text-white hover:bg-blue-600 transition-colors p-3 rounded-md"
                        onClick={() => handleBuyNow(item.productId._id)}
                        title="Buy Now"
                      >
                        <span className="mr-2">Buy Now</span> {/* Text part */}
                        <SlEnergy fontSize={20} /> {/* Icon part */}
                      </button>
                    </div>





                  </div>
                </div>


              </div>
            ))}
          </div>

          {/* Right Section: Total & Checkout */}
          <div className="w-full md:w-1/4 p-6 bg-white rounded-xl shadow-md border border-gray-200">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800 text-center">Order Breakdown</h3>

              {/* Total Price */}
              <div className="flex justify-between items-center text-lg text-gray-800 mb-6">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold">{formatPrice(calculateTotal(cart.items))}</span>
              </div>

              {/* Discount */}
              <div className="flex justify-between items-center text-lg text-green-500 mb-6">
                <span className="font-medium">Total Discount</span>
                <span className="font-bold">{formatPrice(calculateTotalDiscount(cart.items))}</span>
              </div>

              {/* Total Amount */}
              <div className="flex justify-between items-center text-xl font-semibold text-gray-900 mb-8">
                <span>Total Payable</span>
                <span className="font-bold text-gray-800">{formatPrice(calculateTotal(cart.items) - calculateTotalDiscount(cart.items))}</span>
              </div>

              {/* Buttons */}
              <div className="space-y-4">
                {/* Proceed to Checkout Button */}
                <button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-700 text-white py-3 rounded-lg shadow-md hover:bg-indigo-600 transition-colors duration-300 ease-in-out">
                  Proceed to Checkout
                </button>

                {/* Clear All Button */}
                <button
                  className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-3 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300 ease-in-out"
                  onClick={cartClearAll}
                >
                  Clear Cart
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
// Helper function to calculate the total cost of the cart
const calculateTotal = (items) => {
  return items
    .reduce((total, item) => total + item.productId.price * item.quantity, 0)
    .toFixed(); // Round to 2 decimal places
};

// Helper function to calculate the total discount
const calculateTotalDiscount = (items) => {
  return items
    .reduce((total, item) => {
      const discount = (item.productId.price - item.productId.offerPrice) * item.quantity; // Corrected formula
      return total + discount; // Accumulate the discount for each item
    }, 0)
    .toFixed(2); // Round to 2 decimal places
};



export default Cart;
