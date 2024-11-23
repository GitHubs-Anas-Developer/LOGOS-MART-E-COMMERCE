import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./Auth";
import { Toaster, toast } from "react-hot-toast";

const FavoriteContext = createContext();

export const FavoriteContextProvider = ({ children }) => {
  const { userId } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Add product to favorites
  const addToFavorites = async (productId) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/add/favorite/${userId}`,
        { productId }
      );
      setFavoritesCount(favorites.length + 1);
      await fetchFavorites();
      toast.success("Product added to favorites!");
    } catch (error) {
      console.error("Error adding to favorites:", error);
      toast.error("Error adding product to favorites!");
    } finally {
      setLoading(false);
    }
  };

  // Fetch favorites
  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/favorites/${userId}`
      );
      setFavorites(response.data.favorites);
      setFavoritesCount(response.data.favorites.length);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      toast.error("Error fetching favorites!");
    } finally {
      setLoading(false);
    }
  };

  // Delete a single favorite
  const deleteFavorite = async (productId) => {
    try {
      setLoading(true);
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/delete/favorite/${userId}`,
        {
          data: { productId },
        }
      );

      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite.productId._id !== productId)
      );
      setFavoritesCount(favorites.length - 1);
      toast.success("Product removed from favorites!");
    } catch (error) {
      console.error("Error deleting from favorites:", error);
      toast.error("Error removing product from favorites!");
    } finally {
      setLoading(false);
    }
  };

  // Delete all favorites
  const deleteAllFavorites = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/delete/all/favorite/${userId}`
      );

      // Clear all favorites and update the count
      setFavorites([]);
      setFavoritesCount(0);
      toast.success("All products removed from favorites!");
    } catch (error) {
      console.error("Error deleting all favorites:", error);
      toast.error("Error removing all products from favorites!");
    } finally {
      setLoading(false);
    }
  };

  // Fetch favorites when userId is available or changes
  useEffect(() => {
    if (userId) fetchFavorites();
  }, [userId]);

  return (
    <FavoriteContext.Provider
      value={{
        addToFavorites,
        favorites,
        favoritesCount,
        loading,
        deleteFavorite,
        deleteAllFavorites,
      }}
    >
      {children}
      <Toaster /> {/* Toast notifications */}
    </FavoriteContext.Provider>
  );
};

export default FavoriteContext;
