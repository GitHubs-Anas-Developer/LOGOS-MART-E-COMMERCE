import React, { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductsContext from "../../context/Products";
import CartContext from "../../context/Cart";
import FavoriteContext from "../../context/Favorite";
import { FaHeart, FaStar } from "react-icons/fa"; // Import icons

function SubsubcategoryProducts() {
  const { id } = useParams();
  const {
    fetchSubsubcategoryproducts,
    subsubcategoryProducts,
    loading,
    error,
  } = useContext(ProductsContext);
  const { addToCart } = useContext(CartContext);
  const { addToFavorites } = useContext(FavoriteContext);

  useEffect(() => {
    fetchSubsubcategoryproducts(id);
  }, [id]);

  const addToCartHandler = (e, productId) => {
    e.preventDefault();
    addToCart(productId); // Add to Cart logic
  };

  const addToFavoritesHandler = (e, productId) => {
    e.preventDefault();
    addToFavorites(productId); // Add to Favorites logic
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  if (loading) {
    return (
      <div className="text-center text-xl font-semibold text-gray-700 mt-20">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-xl font-semibold text-red-600 mt-20">
        Error fetching products
      </div>
    );
  }

  if (!subsubcategoryProducts || subsubcategoryProducts.length === 0) {
    return (
      <div className="text-center text-xl font-semibold text-gray-700 mt-20">
        No products found in this category.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
        Products in this Category
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {subsubcategoryProducts.map((product) => (
          <div
            key={product._id}
            className="relative bg-white rounded-2xl shadow-md overflow-hidden transform hover:shadow-lg hover:scale-105 transition-all duration-300 ease-out"
          >
            {/* Favorite Icon */}
            <button
              onClick={(e) => addToFavoritesHandler(e, product._id)}
              className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition duration-300"
            >
              <FaHeart size={20} />
            </button>

            {/* Product Link */}
            <Link to={`/productDetails/${product._id}`}>
              {/* Product Image */}
              <img
                src={product.colors[0].images[0]} // Assuming the first color image
                alt={product.title}
                className="w-full h-56 object-contain rounded-t-2xl"
                loading="lazy"
              />

              {/* Product Info */}
              <div className="p-6 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500">{product.category}</p>

                {/* Pricing and Discount */}
                <div className="flex items-center space-x-3 mt-3">
                  <span className="text-base font-semibold text-gray-400 line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xl font-bold text-green-600">
                    {formatPrice(product.offerPrice)}
                  </span>
                  {product.discountPercentage && (
                    <span className="text-sm font-medium text-red-500">
                      ({product.discountPercentage}% off)
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center mt-3 space-x-1">
                  <span className="text-yellow-400 flex items-center">
                    {[...Array(Math.floor(product.rating || 0))].map((_, i) => (
                      <FaStar key={i} size={14} />
                    ))}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">
                    {product.rating}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <div className="flex justify-center mt-6">
                  <button
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    onClick={(e) => addToCartHandler(e, product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubsubcategoryProducts;
