import React from "react";
import { Link } from "react-router-dom";

function OfferProducts({ discount, title, isLoading }) {
  console.log("discount", discount._id);

  return (
    <Link to={`/productDetails/${discount._id}`}>
      <div className="w-full max-w-9xl mx-auto p-6">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
          {title}
        </h2>

        {isLoading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : discount && discount.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
            {discount.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-1 transform hover:scale-105"
                aria-label={`Discounted product: ${product.name}`}
              >
                {/* Discount Badge */}
                <div className="absolute top-1 left-1 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg z-10">
                  {product.discountPercentage}% OFF
                </div>

                {/* Product Image */}
                <img
                  src={product.cardImage}
                  alt={`${product.name} product image`}
                  className="w-full h-48 object-contain rounded-md mb-1 transition-all duration-300 transform hover:scale-110 mt-4"
                />

                <div className="text-center">
                  {/* Product Title */}
                  <h3 className="text-xl font-semibold text-gray-800 mb-1 truncate">
                    {product.title}
                  </h3>

                  {/* Price & Offer Price */}
                  <p className="text-gray-500 text-sm line-through">
                    ${product.price}
                  </p>
                  <p className="text-indigo-600 font-bold text-lg mt-2">
                    Offer Price: ${product.offerPrice}
                  </p>
                </div>

                {/* Add to Cart Button */}
                <div className="mt-6 flex justify-center">
                  <button className="bg-transparent border-2 border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 font-semibold py-1 px-8 rounded-full transition-all duration-200 transform hover:scale-105">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">
            No products available at this discount level.
          </p>
        )}
      </div>
    </Link>
  );
}

export default OfferProducts;
