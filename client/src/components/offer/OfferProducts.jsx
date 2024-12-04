import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa"; // Import the star icons

// Helper function to format the price in INR
const formatPrice = (price) => {
  const flooredPrice = Math.floor(price); // Floor the price to the nearest whole number

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(flooredPrice);
};

function OfferProducts({ discount, title, isLoading }) {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
        {title}
      </h2>

      {/* Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {/* Skeleton Loader for Cards */}
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 animate-pulse rounded-lg p-4 flex flex-col space-y-4"
            >
              <div className="h-36 bg-gray-300 rounded-md mb-4"></div>
              <div className="h-4 bg-gray-300 rounded-md mb-2"></div>
              <div className="h-4 bg-gray-300 rounded-md"></div>
            </div>
          ))}
        </div>
      ) : discount && discount.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {discount.map((product, index) => (
            <Link key={index} to={`/productDetails/${product._id}`}>
              <div
                className="relative bg-white rounded-lg shadow-sm overflow-hidden group hover:bg-gray-50 transition-all duration-300 ease-in-out"
                aria-label={`Discounted product: ${product.name}`}
              >
                {/* Product Image */}
                <img
                  src={product.cardImage}
                  alt={`${product.name} product image`}
                  className="w-full h-40 object-cover transition-all duration-300 transform group-hover:scale-105"
                />

                {/* Discount Badge */}
                {product.variants?.[0]?.discountPercentage > 0 && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md z-10">
                    {product.variants[0].discountPercentage}% OFF
                  </div>
                )}

                {/* Product Details */}
                <div className="p-4 text-center">
                  {/* Product Title */}
                  <h3 className="text-sm font-semibold text-gray-800 mb-2 truncate">
                    {product.title}
                  </h3>

                  {/* Rating (Display stars or similar) */}
                  <p className="text-yellow-500 mb-2">
                    <FaStar />
                    {product.rating || "No Rating"}
                  </p>

                  {/* Price and Offer Price */}
                  <div className="flex justify-center items-center space-x-2">
                    {/* Offer Price */}
                    {product.offerPrice || product.variants?.[0]?.offerPrice ? (
                      <span className="text-sm font-semibold text-green-600">
                        {formatPrice(
                          product.offerPrice ||
                            product.variants?.[0]?.offerPrice
                        )}
                      </span>
                    ) : null}

                    {/* Original Price with line-through */}
                    {(product.price || product.variants?.[0]?.price) && (
                      <span className="text-sm font-medium text-gray-400 line-through">
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
        <p className="text-center text-gray-400">
          No products available at this discount level.
        </p>
      )}
    </div>
  );
}

export default OfferProducts;
