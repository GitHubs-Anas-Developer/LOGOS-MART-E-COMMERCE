import React, { useContext } from "react";
import RelatedProducts from "../../context/RelatedProducts";
import { Link } from "react-router-dom";

function RelatedProductsData() {
  const { relatedProducts, loadingRelatedProducts, error } =
    useContext(RelatedProducts); // Access related products from context

  if (loadingRelatedProducts) {
    return (
      <div className="col-span-full flex justify-center items-center mt-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    if (error) {
      return <p className="text-red-500 text-center"> {error}</p>;
    }
  }
  return (
    <div className="my-12 px-6">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6">
        Related Products
      </h2>

      {/* Grid container for products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
            <Link
              to={`/productDetails/${product._id}`}
              key={product._id}
              className="relative bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Product Image */}
              <div className="w-full overflow-hidden group mt-10">
                <img
                  src={product.cardImage}
                  alt={product.title}
                  className="w-full h-40 object-contain group-hover:scale-110 transition-all duration-300"
                />
              </div>

              {/* Product Details */}
              <div className="p-4 space-y-3">
                {/* Product Title */}
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 truncate">
                  {product.title}
                </h3>

                {/* Product Price */}
                <p className="text-lg font-semibold text-green-600 float-left">
                  ₹{product.offerPrice || product.price}
                </p>

                {/* Product Rating */}
                {product.rating && (
                  <div className="flex items-center text-sm text-yellow-400 mt-1 float-right">
                    <span className="mr-1 ">★</span>
                    <span>{product.rating}</span>
                  </div>
                )}

                {/* Discount Badge */}
                {product.discountPercentage && (
                  <div className="absolute top-0 left-2 bg-red-500 text-white text-xs py-1 px-2 rounded-full">
                    {product.discountPercentage}% OFF
                  </div>
                )}
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-6">
            No related products available
          </p>
        )}
      </div>
    </div>
  );
}

export default RelatedProductsData;
