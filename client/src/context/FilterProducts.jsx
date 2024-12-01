import axios from "axios";
import { createContext, useState } from "react";
import api from "../utils/axiosInstance";

const FilterProductsContext = createContext();

export const FilterProductsContextProvider = ({ children }) => {
  const [filterProducts, setFilterProducts] = useState([]);

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

  return (
    <FilterProductsContext.Provider
      value={{ fetchFilterProducts, filterProducts }}
    >
      {children}
    </FilterProductsContext.Provider>
  );
};

export default FilterProductsContext;
