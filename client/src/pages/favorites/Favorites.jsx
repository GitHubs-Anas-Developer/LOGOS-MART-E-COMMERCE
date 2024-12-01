import React, { useContext } from "react";
import FavoriteContext from "../../context/Favorite";
import { FaHeartBroken, FaTrashAlt, FaArrowLeft } from "react-icons/fa";

function Favorites() {
  const { favorites, deleteFavorite, deleteAllFavorites } =
    useContext(FavoriteContext);

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <img
          src="https://via.placeholder.com/300x200?text=No+Favorites" // Replace with an animation or illustration
          alt="No favorites"
          className="w-72 mb-6"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Your favorites list is empty!
        </h2>
        <p className="text-gray-600 text-center">
          Start exploring our products and add them to your favorites!
        </p>
        <button className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-6 py-3 rounded-full hover:bg-gradient-to-l transition-all">
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 py-12 text-center text-white">
        <h1 className="text-2xl font-extrabold">Your Favorite Products</h1>
        <p className="mt-2 ">
          All your saved favorites in one place. Keep shopping or make a
          purchase now!
        </p>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {favorites.map((favorite) => {
            const formattedDate = new Date(
              favorite.addedAt
            ).toLocaleDateString();

            return (
              <div
                key={favorite._id}
                className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transform transition-transform hover:scale-105"
              >
                {/* Product Image */}
                <div className="h-56 bg-gray-100 overflow-hidden">
                  <img
                    src={favorite.productId.cardImage}
                    alt={favorite.productId.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 truncate">
                    {favorite.productId.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Added on: {formattedDate}
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-4 flex justify-between">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                      onClick={() => {
                        // Add to cart logic
                      }}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      onClick={() => deleteFavorite(favorite.productId._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Actions */}
      <div className="fixed bottom-20 right-5 space-y-4">
        <button
          onClick={deleteAllFavorites}
          className="flex items-center px-4 py-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition"
        >
          <FaTrashAlt className="mr-2" /> Clear All
        </button>
      </div>
    </div>
  );
}

export default Favorites;
