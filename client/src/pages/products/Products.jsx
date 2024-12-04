import React, { useContext, useEffect, useState } from "react";
import ProductsContext from "../../context/Products";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import CartContext from "../../context/Cart";
import Filters from "../../components/filters/Filters";
import { IoFilterSharp } from "react-icons/io5";
import FilterProductsContext from "../../context/FilterProducts";
import WhatsAppButton from "../../components/icons/whatsApp/WhatsAppButton";
import BackToTopButton from "../../components/icons/backToTopButton/BackToTopButton";
import FavoriteContext from "../../context/Favorite";

function Products() {
  const { fetchProducts, loadingProducts, error } = useContext(ProductsContext);
  const { addToCart } = useContext(CartContext);
  const { addToFavorites } = useContext(FavoriteContext);
  const { filterProducts } = useContext(FilterProductsContext);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const formatPrice = (price) => {
    const flooredPrice = Math.floor(price); // Floor the price to the nearest whole number

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(flooredPrice);
  };

  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="container mx-auto px-2 py-6">
        {/* Filters Section */}
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <aside className="hidden lg:block lg:w-1/4 p-4 bg-white rounded-md shadow-md">
            <Filters />
          </aside>

          {/* Mobile Filters */}
          {isFilterOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-10">
              <div className="relative w-4/5 h-full bg-white p-4">
                <button
                  className="absolute top-2 right-2 text-gray-600"
                  onClick={() => setIsFilterOpen(false)}
                >
                  ✕
                </button>
                <Filters />
              </div>
            </div>
          )}

          {/* Products Section */}
          <main className="flex-1">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold ml-2">All Products</h2>
              <button
                className="lg:hidden bg-black text-white py-2 px-4 rounded-md"
                onClick={() => setIsFilterOpen(true)}
              >
                <IoFilterSharp />
              </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 ml-2">
              {loadingProducts ? (
                <div className="col-span-full flex justify-center items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                </div>
              ) : filterProducts.length === 0 ? (
                <div className="col-span-full text-center text-gray-500">
                  No products found.
                </div>
              ) : (
                filterProducts.map((product) => (
                  <Link
                    to={`/productDetails/${product._id}`}
                    key={product._id}
                    className="bg-white rounded-md shadow-md hover:shadow-lg transition overflow-hidden"
                  >
                    {/* Product Image */}
                    <div className="relative">
                      <img
                        src={product.cardImage}
                        alt={product.title}
                        className="w-full h-32 object-contain"
                        loading="lazy"
                      />
                      <button
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                        onClick={(e) => {
                          e.preventDefault();
                          addToFavorites(product._id);
                        }}
                      >
                        <FaHeart size={20} />
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {product.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {product.category}
                      </p>

                      {/* Pricing */}
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-green-600">
                          {product.offerPrice
                            ? formatPrice(product.offerPrice)
                            : formatPrice(
                                product.variants?.[0]?.offerPrice || 0
                              )}
                        </span>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        className="mt-1 w-full py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product._id);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
      <WhatsAppButton />
      <BackToTopButton />
    </div>
  );
}

export default Products;
