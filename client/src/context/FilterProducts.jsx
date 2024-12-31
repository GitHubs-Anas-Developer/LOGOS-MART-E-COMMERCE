import { createContext, useState } from "react";
import api from "../utils/axiosInstance";

const FilterProductsContext = createContext();

export const FilterProductsContextProvider = ({ children }) => {
  const [filterProducts, setFilterProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false); // State for tracking loading
  const [error, setError] = useState(null); // State for tracking errors
  const [items, setItems] = useState([]);

  const fetchFilterProducts = async (
    rating,
    priceRange,
    sortOption,
    selectedBrand
  ) => {
    try {
      setLoadingProducts(true); // Start loading
      setError(null); // Reset errors

      const response = await api.get(`/api/v1/filter/products`, {
        params: {
          rating,
          priceRange: priceRange?.join("-"), // Safely convert price range to a string
          sortOption,
          selectedBrand,
        },
      });

      if (response?.data?.filterProducts) {
        setFilterProducts(response.data.filterProducts); // Set fetched products to the state
      } else {
        throw new Error("Unexpected response structure");
      }

      console.log("Fetched products:", response.data);
    } catch (error) {
      console.error("Error fetching filter products:", error);
      setError(error.message || "An error occurred while fetching products");
    } finally {
      setLoadingProducts(false); // End loading
    }
  };

  const fetchBrands = async () => {
    try {
      setLoadingProducts(true); // Start loading
      setError(null); // Reset errors

      const response = await api.get("/api/v1/brands");

      if (response?.data?.brands) {
        setBrands(response.data.brands); // Update the state with the fetched brands
      } else {
        throw new Error("Unexpected response structure");
      }

      console.log("Fetched brands:", response.data.brands);
    } catch (error) {
      console.error("Error fetching brands:", error);
      setError(error.message || "An error occurred while fetching brands");
    } finally {
      setLoadingProducts(false); // End loading
    }
  };

  const searchItems = async (searchQuery) => {
    try {
      setLoadingProducts(true); // Start loading
      setError(null); // Reset errors

      // Make the API call with the search query as a parameter
      const response = await api.get("/api/v1/search/itmes", {
        params: { query: searchQuery }, // Pass the search query dynamically
      });

      if (response?.data?.items) {
        setItems(response.data.items); // Update the products state with the fetched items
      } else {
        throw new Error("Unexpected response structure"); // Handle unexpected responses
      }

      console.log("Search results:", response.data.items);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError(error.message || "An error occurred while fetching items");
    } finally {
      setLoadingProducts(false); // End loading
    }
  };

  return (
    <FilterProductsContext.Provider
      value={{
        fetchFilterProducts,
        filterProducts,
        fetchBrands,
        brands,
        searchItems,
        items,
        loadingProducts,
        error,
      }}
    >
      {children}
    </FilterProductsContext.Provider>
  );
};

export default FilterProductsContext;
