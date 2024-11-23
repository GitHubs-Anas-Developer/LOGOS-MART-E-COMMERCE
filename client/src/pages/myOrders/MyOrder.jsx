import React, { useContext, useEffect } from "react";
import OrderContext from "../../context/Orders";
import { Link } from "react-router-dom";
function MyOrder() {
  const { orderList, loading, error, fetchOrderList } =
    useContext(OrderContext);

  useEffect(() => {
    fetchOrderList(); // Fetch orders when the component mounts
  }, []);

  console.log("orderList", orderList);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg animate-pulse">Loading orders...</p>
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

  if (orderList.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">No orders found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">My Orders</h1>
      <div className="space-y-4">
        {orderList.map((order) => (
          <div
            key={order._id}
            className="flex flex-col lg:flex-row items-start lg:items-center bg-white   p-4  border rounded-lg "
          >
            {/* Left Section: Image */}
            <div className="w-full lg:w-28 h-28 flex-shrink-0 bg-gray-100  rounded-lg overflow-hidden ">
              <img
                src={order.productId?.cardImage}
                alt={order.productId?.title || "Product"}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Middle Section: Order Details */}
            <div className="flex-1 mt-4 lg:mt-0 lg:ml-6">
              <h2 className=" font-medium text-gray-800">
                {order.productId?.title || "Product Name"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Order ID:{" "}
                <span className="font-mono">{order.razorpayOrderId}</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Ordered on:{" "}
                {new Date(order.createdAt).toLocaleDateString("en-IN")}
              </p>
              <p className="text-sm mt-3 text-black font-bold">
                Payment Status:{" "}
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    order.paymentStatus === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </p>
            </div>

            {/* Right Section: Summary */}
            <div className="mt-4 lg:mt-0 text-right lg:ml-auto ml-auto">
              <p className="text-sm text-gray-500">
                Quantity: {order.quantity}
              </p>
              <p className="text-sm text-gray-500">
                Price: ₹{order.productId?.price}
              </p>
              <p className="text-sm text-gray-500">Tax: ₹{order.taxPrice}</p>
              <p className="text-sm text-gray-500">
                Delivery: ₹{order.deliveryCharge}
              </p>
              <p className="text-lg font-bold text-gray-800 mt-2">
                Total: ₹{order.totalAmount}
              </p>
              <Link to={`/myOrderDetails/${order._id}`}>
                <button className="text-blue-600 text-sm font-medium mt-2 hover:text-blue-800">
                  View Details &rarr;
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrder;
