import React, { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductsContext from "../../context/Products";
import CartContext from "../../context/Cart";
import FavoriteContext from "../../context/Favorite";
import { FaHeart, FaStar } from "react-icons/fa"; // Icons for wishlist and ratings
import { FiShoppingCart } from "react-icons/fi"; // Shopping cart icon

function SubsubcategoryProducts() {
  const { id } = useParams();
  const {
    fetchSubsubcategoryProducts,
    subSubcategoryProducts,
    loadingSubSubcategoryProducts,
    error,
  } = useContext(ProductsContext);
  const { addToCart } = useContext(CartContext);
  const { addToFavorites } = useContext(FavoriteContext);

  useEffect(() => {
    fetchSubsubcategoryProducts(id);
  }, [id]);

  const addToCartHandler = (e, productId) => {
    e.preventDefault();
    addToCart(productId);
  };

  const addToFavoritesHandler = (e, productId) => {
    e.preventDefault();
    addToFavorites(productId);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);

  if (loadingSubSubcategoryProducts) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 mt-20 font-semibold">
        {error}
      </div>
    );
  }

  if (!subSubcategoryProducts || subSubcategoryProducts.length === 0) {
    return (
      <div className="text-center text-xl font-medium text-gray-700 mt-20">
        No products found in this category.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Products in this Category
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {subSubcategoryProducts.map((product) => (
          <div
            key={product._id}
            className="relative border rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
          >
            {/* Wishlist Button */}
            <button
              onClick={(e) => addToFavoritesHandler(e, product._id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition duration-300"
            >
              <FaHeart size={18} />
            </button>

            {/* Product Link */}
            <Link to={`/productDetails/${product._id}`}>
              {/* Product Image */}
              <img
                src={product.colors[0].images[0]} // Assuming the first color image
                alt={product.title}
                className="w-full h-48 object-contain"
                loading="lazy"
              />
            </Link>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-800 truncate">
                {product.title}
              </h3>
              <p className="text-xs text-gray-500">{product.category}</p>

              {/* Price and Discount */}
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-lg font-bold text-gray-800">
                  {formatPrice(product.offerPrice)}
                </span>
                {product.discountPercentage && (
                  <span className="text-xs text-green-600">
                    {product.discountPercentage}% off
                  </span>
                )}
              </div>

              {/* Ratings */}
              <div className="flex items-center mt-1">
                {[...Array(Math.floor(product.rating || 0))].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" size={12} />
                ))}
                <span className="text-xs text-gray-500 ml-2">
                  {product.rating || "No reviews"}
                </span>
              </div>

              {/* Add to Cart */}
              <button
                onClick={(e) => addToCartHandler(e, product._id)}
                className="mt-4 w-full flex items-center justify-center bg-blue-500 text-white text-sm py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                <FiShoppingCart size={16} className="mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubsubcategoryProducts;
