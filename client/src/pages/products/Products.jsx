import React, { useContext, useEffect, useState } from "react";
import ProductsContext from "../../context/Products";
import { FaHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import CartContext from "../../context/Cart";
import Filters from "../../components/filters/Filters";
import { IoFilterSharp } from "react-icons/io5";
import FilterProductsContext from "../../context/FilterProducts";
import WhatsAppButton from "../../components/icons/whatsApp/WhatsAppButton";
import BackToTopButton from "../../components/icons/backToTopButton/BackToTopButton";
import FavoriteContext from "../../context/Favorite";
import CategoriesBanner from "../home/categoryBanner/CategoriesBanner";
import { FiShoppingCart } from "react-icons/fi"; // Shopping cart icon
import { FiHeart } from "react-icons/fi";

function Products() {
  const { fetchProducts } = useContext(ProductsContext);
  const { addToCart } = useContext(CartContext);
  const { addToFavorites } = useContext(FavoriteContext);
  const { filterProducts, loadingProducts, error } = useContext(
    FilterProductsContext
  );

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    fetchProducts();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(Math.floor(price));
  };

  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  return (
    <>
      <CategoriesBanner />
      <div className="min-h-screen  text-gray-800">
        <div className="container mx-auto ">
          {/* Page Header */}
          <div className="flex justify-between items-center  ">
            <h2 className="md:hidden text-xl font-extrabold text-gray-800 ml-3 ">
              Products
            </h2>
            <button
              className="lg:hidden bg-orange-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 ml-auto m-2"
              onClick={() => setIsFilterOpen(true)}
            >
              <IoFilterSharp size={20} />
            </button>
          </div>

          {/* Filters and Products */}
          <div className="flex flex-col lg:flex-row ">
            {/* Filters Sidebar */}
            <aside className="hidden lg:block lg:w-1/5  border  ml-1">
              <Filters />
            </aside>

            {/* Mobile Filters */}
            {isFilterOpen && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end">
                <div className="w-4/5 max-w-sm h-full bg-white shadow-lg  p-6 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-gray-800">Filters</h2>
                    <button
                      className="text-gray-500 hover:text-gray-800 focus:outline-none"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <Filters />
                  </div>
                  <button
                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}

            {/* Product Grid */}
            <main className="flex-1 border p-2">
              {loadingProducts ? (
                <div className="flex justify-center items-center min-h-[60vh]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
                </div>
              ) : filterProducts.length === 0 ? (
                <div className="text-center font-medium">
                  "No products found."
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {filterProducts.map((product) => (
                    <Link
                      to={`/productDetails/${product._id}`}
                      key={product._id}
                      className=" transition-transform transform hover:-translate-y-1 overflow-hidden"
                    >
                      {/* Product Image */}
                      <div className="relative h-48 flex justify-center items-center pt-5">
                        <img
                          src={product.cardImage}
                          alt={product.title}
                          className="object-contain h-56 w-auto"
                          loading="lazy"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        {/* Title */}
                        <h3 className="text-sm font-semibold text-gray-800 truncate mb-2 mt-2">
                          {product.title}
                        </h3>

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
                              : formatPrice(
                                  product.variants?.[0]?.offerPrice
                                ) || ""}
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

                      {/* Footer: Add to Cart */}
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
                    </Link>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
        <WhatsAppButton />
        <BackToTopButton />
      </div>
    </>
  );
}

export default Products;
