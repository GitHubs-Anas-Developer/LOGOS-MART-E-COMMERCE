import React, { useContext } from "react";
import RelatedProducts from "../../context/RelatedProducts";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

function RelatedProductsData() {
  const { relatedProducts, loadingRelatedProducts, error } =
    useContext(RelatedProducts);

  if (loadingRelatedProducts) {
    return (
      <div className="col-span-full flex justify-center items-center mt-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <div className="my-12 px-6">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6">
        Related Products
      </h2>

      <div className="flex overflow-x-auto space-x-4 scrollbar-hide scroll-smooth">
        {relatedProducts.length > 0
          ? relatedProducts.map((product) => (
              <Link
                key={product._id}
                to={`/productDetails/${product._id}`}
                className="flex-none"
              >
                <div
                  className="relative bg-white rounded-lg border shadow-md overflow-hidden w-44 group hover:shadow-lg transition-transform"
                  aria-label={
                    product.variants?.[0]?.discountPercentage > 0
                      ? `Discounted product: ${product.title}`
                      : `Product: ${product.title}`
                  }
                >
                  <img
                    src={product.cardImage || "/images/fallback.jpg"}
                    alt={`${product.name || "Product"} image`}
                    className="w-full h-36 object-contain transition-transform duration-300 transform group-hover:scale-110"
                    loading="lazy"
                  />

                  {product.variants?.[0]?.discountPercentage > 0 && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      {product.variants[0].discountPercentage}% OFF
                    </div>
                  )}

                  <div className="p-4 text-center">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2 truncate">
                      {product.title}
                    </h3>

                    <div className="flex justify-center items-center mb-3">
                      <FaStar className="text-yellow-500 mr-1" />
                      <span className="text-gray-600 text-sm">
                        {product.rating || "No Rating"}
                      </span>
                    </div>

                    <div className="flex justify-center items-center space-x-2">
                      {product.offerPrice ||
                      product.variants?.[0]?.offerPrice ? (
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
            ))
          : ""}
      </div>
    </div>
  );
}

export default RelatedProductsData;
