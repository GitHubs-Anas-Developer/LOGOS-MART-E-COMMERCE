import React, { useContext } from "react";
import FavoriteContext from "../../context/Favorite";

function Favorites() {
  const { favorites, deleteFavorite, deleteAllFavorites } = useContext(FavoriteContext);

  // If there are no favorites, display a message
  if (favorites.length === 0) {
    return (
      <div className="text-center text-xl font-semibold text-gray-700 mt-20">
        You have no favorite products yet.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12 tracking-tight">
          My Favorite Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {favorites.map((favorite) => {
            // Format the addedAt date into a readable format
            const formattedDate = new Date(favorite.addedAt).toLocaleDateString();

            return (
              <div
                key={favorite._id}
                className="relative bg-white rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl overflow-hidden"
              >
                {/* Product Image */}
                <div className="h-72 bg-gradient-to-t from-gray-200 to-white overflow-hidden">
                  <img
                    src={favorite.productId.cardImage} // Product image URL from productId
                    alt={favorite.productId.title}
                    className="w-full h-full object-contain rounded-t-xl"
                    loading="lazy"
                  />
                </div>

                {/* Product Info */}
                <div className="p-6 space-y-3 bg-white rounded-b-xl">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {favorite.productId.title}
                  </h3>

                  {/* Display the added date */}
                  <p className="text-sm text-gray-600">
                    Added on: {formattedDate}
                  </p>

                  {/* Add to Cart Button */}
                  <div className="mt-4">
                    <button
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-lg shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105"
                      onClick={() => {
                        // Add to Cart logic here
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>

                  {/* Delete Button for single product */}
                  <div className="mt-4">
                    <button
                      className="w-full bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600 transform transition duration-300 hover:scale-105"
                      onClick={() => deleteFavorite(favorite.productId._id)}
                    >
                      Delete from Favorites
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Button to clear all favorites */}
        <div className="text-center mt-10">
          <button
            onClick={deleteAllFavorites} // Remove parentheses to avoid immediate execution
            className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Clear All Favorites
          </button>
        </div>
      </div>
    </div>
  );
}

export default Favorites;
