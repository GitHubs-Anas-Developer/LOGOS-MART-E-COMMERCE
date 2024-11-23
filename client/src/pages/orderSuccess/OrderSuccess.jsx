import React from "react";
import { useLocation } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();
  const paymentId = location.state; // Access the payment ID from state

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-3xl font-semibold text-green-600 mb-4">
          Payment Successful!
        </h1>
        {paymentId ? (
          <p className="text-gray-600">
            Your payment ID is:{" "}
            <span className="font-bold text-gray-800">{paymentId}</span>
          </p>
        ) : (
          <p className="text-gray-600">Thank you for your purchase.</p>
        )}
        <p className="text-gray-600 mt-2">We appreciate your business!</p>
        <button
          onClick={() => (window.location.href = "/")} // Redirect to home
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-6 hover:bg-blue-600 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;
