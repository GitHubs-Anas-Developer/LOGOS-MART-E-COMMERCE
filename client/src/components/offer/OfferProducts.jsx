import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

// Helper function to format the price in INR
const formatPrice = (price) => {
  const flooredPrice = Math.floor(price);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(flooredPrice);
};

function OfferProducts({ discount, title, isLoading }) {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-1 py-8">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
        {title}
      </h2>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex overflow-x-auto space-x-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 animate-pulse rounded-lg p-4 w-48 flex-none"
            >
              <div className="h-36 bg-gray-300 rounded-md mb-4"></div>
              <div className="h-4 bg-gray-300 rounded-md mb-2"></div>
              <div className="h-4 bg-gray-300 rounded-md"></div>
            </div>
          ))}
        </div>
      ) : discount && discount.length > 0 ? (
        <div className="flex overflow-x-auto space-x-1 scrollbar-hide">
          {discount.map((product, index) => (
            <Link
              key={index}
              to={`/productDetails/${product._id}`}
              className="flex-none"
            >
              <div
                className="relative bg-white rounded-lg border shadow-md overflow-hidden w-44 group hover:shadow-lg transition-transform "
                aria-label={`Discounted product: ${product.name}`}
              >
                {/* Product Image */}
                <img
                  src={product.cardImage}
                  alt={`${product.name} product image`}
                  className="w-full h-36 object-contain transition-transform duration-300 transform group-hover:scale-110"
                />

                {/* Discount Badge */}
                {product.variants?.[0]?.discountPercentage > 0 && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {product.variants[0].discountPercentage}% OFF
                  </div>
                )}

                {/* Product Details */}
                <div className="p-4 text-center">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2 truncate">
                    {product.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex justify-center items-center mb-3">
                    <FaStar className="text-yellow-500 mr-1" />
                    <span className="text-gray-600 text-sm">
                      {product.rating || "No Rating"}
                    </span>
                  </div>

                  {/* Price Section */}
                  <div className="flex justify-center items-center space-x-2">
                    {product.offerPrice || product.variants?.[0]?.offerPrice ? (
                      <span className="text-lg font-semibold text-green-600">
                        {formatPrice(
                          product.offerPrice ||
                            product.variants?.[0]?.offerPrice
                        )}
                      </span>
                    ) : null}
                    {(product.price || product.variants?.[0]?.price) && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(
                          product.price || product.variants?.[0]?.price
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No products available at this discount level.
        </p>
      )}
    </div>
  );
}

export default OfferProducts;
