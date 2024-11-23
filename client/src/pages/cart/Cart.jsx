import React, { useContext, useEffect } from "react";
import CartContext from "../../context/Cart";
import { MdDelete } from "react-icons/md";

function Cart() {
  const { cart, cartDeleteOne } = useContext(CartContext);

  if (!cart?.items?.length) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-gray-700 rounded-lg shadow-md p-10 text-center">
          <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
          <p className="text-gray-500">Your cart is currently empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold mb-6 text-black">
          Shopping Cart
        </h2>

        <div className="space-y-4">
          {cart.items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b py-4"
            >
              <img
                src={item.productId.cardImage}
                alt={item.productId.title}
                className="w-20 h-20 object-contain rounded-lg"
              />

              <div className="flex-1 ml-4">
                <h3 className="text-lg font-medium text-black">
                  {item.productId.title}
                </h3>
                <p className="text-gray-500">Price: ₹{item.productId.price}</p>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
              </div>

              <button
                className="text-red-500 hover:text-red-700 transition-colors border p-2 rounded-2xl"
                onClick={() => cartDeleteOne(item._id)}
              >
                <MdDelete fontSize={30} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center border-t pt-4">
            <h3 className="text-xl font-semibold text-black">Total:</h3>
            <p className="text-xl font-bold text-black">
              ₹{calculateTotal(cart.items)}
            </p>
          </div>

          <div className="flex space-x-4 mt-6">
            <button className="bg-blue-500 text-white rounded-lg px-6 py-2 font-semibold hover:bg-blue-600 transition-colors">
              Proceed to Checkout
            </button>

            <button className="bg-red-500 text-white rounded-lg px-6 py-2 font-semibold hover:bg-red-600 transition-colors">
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to calculate the total cost
const calculateTotal = (items) => {
  return items
    .reduce((total, item) => total + item.productId.price * item.quantity, 0)
    .toFixed(2);
};

export default Cart;
