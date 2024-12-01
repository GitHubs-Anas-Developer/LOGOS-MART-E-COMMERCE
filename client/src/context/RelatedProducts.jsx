import { createContext, useState } from "react";
import api from "../utils/axiosInstance";

const RelatedProducts = createContext();

export const RelatedProductsProvider = ({ children }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelatedProducts, setLoadingRelatedProducts] = useState(false);
  const [error, setError] = useState(null); // New error state

  // Function to fetch related products based on subsubcategoryId
  const fetchRelatedProducts = async (subsubcategoryId) => {
    console.log("subsubcategoryId", subsubcategoryId);

    setLoadingRelatedProducts(true);
    setError(null); // Reset error before making a request
    try {
      const response = await api.get(
        `/api/v1/products/related/${subsubcategoryId}`
      );
      setRelatedProducts(response.data);
      console.log("Related products fetched: ", response.data);
    } catch (error) {
      console.error("Error fetching related products:", error);
      setError(
        error.response?.data?.message || "Failed to fetch related products."
      ); // Use backend error message if available
    } finally {
      setLoadingRelatedProducts(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <RelatedProducts.Provider
      value={{
        relatedProducts,
        fetchRelatedProducts,
        loadingRelatedProducts,
        error,
      }}
    >
      {children}
    </RelatedProducts.Provider>
  );
};

export default RelatedProducts;
