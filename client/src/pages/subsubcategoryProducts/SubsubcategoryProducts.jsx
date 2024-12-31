import React, { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductsContext from "../../context/Products";
import CartContext from "../../context/Cart";
import FavoriteContext from "../../context/Favorite";
import { FaHeart, FaStar } from "react-icons/fa"; // Icons for wishlist and ratings
import { FiShoppingCart } from "react-icons/fi"; // Shopping cart icon
import { FiHeart } from "react-icons/fi";
import CategoriesBanner from "../home/categoryBanner/CategoriesBanner";

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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
    <>
      <CategoriesBanner />
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
                  src={product.cardImage} // Assuming the first color image
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

                {/* Price and Discount */}
                <div className="p-4">
                  {/* Title */}

                  {/* Ratings */}
                  <div className="flex items-center mt-2">
                    <span className="bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded">
                      ⭐ {product.rating || "4.0"}
                    </span>
                    <span className="ml-2 text-xs text-gray-500">
                      ({product.reviews.length || 0} reviews)
                    </span>
                  </div>

                  {/* Price and Discount */}
                  <div className="flex items-center justify-between mb-2">
                    {/* Offer Price */}
                    <span className="text-xl font-bold text-red-600">
                      {product.offerPrice
                        ? formatPrice(product.offerPrice)
                        : formatPrice(product.variants?.[0]?.offerPrice) || ""}
                    </span>

                    {/* Discount Percentage */}
                    {(product.discountPercentage ||
                      product.variants?.[0]?.discountPercentage) && (
                      <span className="text-sm font-medium text-green-600">
                        {product.discountPercentage
                          ? `${product.discountPercentage}% OFF`
                          : `${product.variants?.[0]?.discountPercentage}% OFF`}
                      </span>
                    )}
                  </div>

                  {/* Original Price */}
                  <div className="flex justify-between items-center">
                    {/* Original Price */}
                    <div className="text-sm text-gray-400 line-through">
                      {product.price
                        ? formatPrice(product.price)
                        : formatPrice(product.variants?.[0]?.price) || ""}
                    </div>

                    {/* Discount Savings */}
                    {(product.offerPrice && product.price) ||
                    (product.variants?.[0]?.offerPrice &&
                      product.variants?.[0]?.price) ? (
                      <span className="ml-2 bg-green-100 text-green-600 font-medium text-xs px-2 py-1 rounded-lg shadow-sm">
                        Save ₹
                        {product.offerPrice && product.price
                          ? product.price - product.offerPrice
                          : product.variants?.[0]?.price -
                            product.variants?.[0]?.offerPrice}
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* Ratings */}

                <div className="flex space-x-2 p-1">
                  {/* Add to Cart Button */}
                  <button
                    className="flex-1 py-2 flex items-center justify-center text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 transition rounded-lg shadow-md"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product._id);
                    }}
                  >
                    <FiShoppingCart className="text-lg mr-2" />
                  </button>

                  {/* Add to Wishlist Button */}
                  <button
                    className="flex-1 py-2 flex items-center justify-center text-sm font-medium text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white transition rounded-lg shadow-md"
                    onClick={(e) => {
                      e.preventDefault();
                      addToWishlist(product._id);
                    }}
                  >
                    <FiHeart className="text-lg mr-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SubsubcategoryProducts;
