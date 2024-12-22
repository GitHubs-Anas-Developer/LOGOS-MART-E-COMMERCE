import axios from "axios";
import { createContext, useState } from "react";
import api from "../utils/axiosInstance";

const FilterProductsContext = createContext();

export const FilterProductsContextProvider = ({ children }) => {
  const [filterProducts, setFilterProducts] = useState([]);
  const [brands, setBrands] = useState([]);

  const fetchFilterProducts = async (rating, priceRange, sortOption) => {
    try {
      const response = await api.get(`/api/v1/filter/products`, {
        params: {
          rating,
          priceRange: priceRange.join("-"), // Convert price range to a string
          sortOption,
        },
      });

      setFilterProducts(response.data.filterProducts); // Set fetched products to the state
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBrands = async () => {
    try {
      // Fetch brands from the API
      const response = await api.get("/api/v1/brands");

      // Check if the response contains the expected data

      setBrands(response.data.brands); // Update the state with the fetched brands
    } catch (error) {
      // Log detailed error information
      console.error("Error fetching brands:", error.message);
    }
  };

  return (
    <FilterProductsContext.Provider
      value={{ fetchFilterProducts, filterProducts, fetchBrands, brands }}
    >
      {children}
    </FilterProductsContext.Provider>
  );
};

export default FilterProductsContext;
