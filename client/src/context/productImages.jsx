import React, { createContext, useState } from "react";
import api from "../utils/axiosInstance"; // Ensure axiosInstance is correctly configured

// Create a context for Product Images
const ProductImagesContext = createContext();

// Define the provider for the context
const ProductImagesContextProvider = ({ children }) => {
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch images for a product
  const fetchProductImages = async (productId) => {
    setLoading(true);
    try {
      // Assuming you're using GET to fetch product images
      const response = await api.get(`/api/v1/product-images/${productId}`);

      if (response.status === 200) {
        // Assuming response.data contains the images array
        setProductImages(response.data.images);
      } else {
        setError("Failed to fetch images");
      }
    } catch (error) {
      setError("Failed to fetch images");
      console.error(error); // Log the error for debugging
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductImagesContext.Provider
      value={{
        productImages,
        loading,
        error,
        fetchProductImages,
      }}
    >
      {children}
    </ProductImagesContext.Provider>
  );
};

export { ProductImagesContext, ProductImagesContextProvider };
