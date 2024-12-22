import axios from "axios";
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { AuthContext } from "./Auth";
import { Toaster, toast } from "react-hot-toast";
import api from "../utils/axiosInstance";

const FavoriteContext = createContext();

export const FavoriteContextProvider = ({ children }) => {
  const { userId } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Add product to favorites
  const addToFavorites = async (productId) => {
    console.log("productId");
    
    try {
      // Make API call
      const response = await api.post(`/api/v1/add/favorite`, { productId });

      // Handle success
      console.log("Response:", response);
      toast.success("Product added to favorites!");

      // Optionally update state here if needed (e.g., updating UI)
    } catch (error) {
      // Log error and show toast notification
      console.error("Error adding to favorites:", error);
      toast.error(
        error.response?.data?.message || "Error adding product to favorites!"
      );
    }
  };

  // Fetch favorites
  const fetchFavorites = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const response = await api.get(`/api/v1/favorites/${userId}`);

      setFavorites(response.data.favorites);
      setFavoritesCount(response.data.favorites.length);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      toast.error(error.response?.data?.message || "Error fetching favorites!");
    } finally {
      setLoading(false);
    }
  };

  // Delete a single favorite
  const deleteFavorite = async (productId) => {
    try {
      setLoading(true);
      await api.delete(`/api/v1/delete/favorite/${userId}`, {
        data: { productId },
      });

      setFavorites((prev) =>
        prev.filter((favorite) => favorite.productId._id !== productId)
      );
      setFavoritesCount((prevCount) => prevCount - 1);
      toast.success("Product removed from favorites!");
    } catch (error) {
      console.error("Error deleting from favorites:", error);
      toast.error(error.response?.data?.message || "Error removing product!");
    } finally {
      setLoading(false);
    }
  };

  // Delete all favorites
  const deleteAllFavorites = async () => {
    try {
      setLoading(true);
      await api.delete(`/api/v1/delete/all/favorite/${userId}`);

      setFavorites([]);
      setFavoritesCount(0);
      toast.success("All products removed from favorites!");
    } catch (error) {
      console.error("Error deleting all favorites:", error);
      toast.error(error.response?.data?.message || "Error clearing favorites!");
    } finally {
      setLoading(false);
    }
  };

  // Fetch favorites when userId is available or changes
  useEffect(() => {
    fetchFavorites();
  }, [userId]);

  // Memoized Context Value
  const contextValue = useMemo(
    () => ({
      addToFavorites,
      favorites,
      favoritesCount,
      loading,
      deleteFavorite,
      deleteAllFavorites,
    }),
    [favorites, favoritesCount, loading]
  );

  return (
    <FavoriteContext.Provider value={contextValue}>
      {children}
      <Toaster /> {/* Toast notifications */}
    </FavoriteContext.Provider>
  );
};

export default FavoriteContext;
