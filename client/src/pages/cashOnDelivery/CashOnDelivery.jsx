import React, { useEffect } from "react";

function CashOnDelivery() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Cash on Delivery
      </h2>
      <p className="text-gray-600">
        Pay for your order in cash when it is delivered to your doorstep.
      </p>
      <p className="mt-4 text-sm text-gray-500">
        This option is available for selected products and locations.
      </p>
    </div>
  );
}

export default CashOnDelivery;
