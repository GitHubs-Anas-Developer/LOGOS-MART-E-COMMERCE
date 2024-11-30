import axios from "axios";
import { createContext, useState } from "react";
import api from "../utils/axiosInstance";

const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [subSubcategoryProducts, setSubSubcategoryProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingProductDetails, setLoadingProductDetails] = useState(false);
  const [loadingSubSubcategoryProducts, setLoadingSubSubcategoryProducts] =
    useState(false);
  const [error, setError] = useState(null); // New error state

  const fetchProducts = async () => {
    setLoadingProducts(true);
    setError(null); // Reset error state before making the request
    try {
      const response = await api.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/products`
      );
      if (response.status === 200) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message || "Failed to fetch products."); // Set error message
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchSingleProductDetails = async (productId) => {
    setLoadingProductDetails(true);
    setError(null); // Reset error state before making the request
    try {
      const response = await api.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/product/details/${productId}`
      );
      if (response.status === 200) {
        setProductDetails(response.data.productDetails);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError(error.message || "Failed to fetch product details.");
    } finally {
      setLoadingProductDetails(false);
    }
  };

  const fetchSubsubcategoryProducts = async (subsubcategoryId) => {
    setLoadingSubSubcategoryProducts(true);
    setError(null); // Reset error state before making the request
    try {
      const response = await api.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/products/subsubcategory/${subsubcategoryId}`
      );
      if (response.status === 200) {
        setSubSubcategoryProducts(response.data.subsubcategoryProducts);
      }
    } catch (error) {
      console.error("Error fetching sub-subcategory products:", error);
      if (error.status === 404) {
        setError(error.message || "Failed to fetch sub-subcategory products.");
      }
    } finally {
      setLoadingSubSubcategoryProducts(false);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        productDetails,
        subSubcategoryProducts,
        fetchProducts,
        fetchSingleProductDetails,
        fetchSubsubcategoryProducts,
        loadingProducts,
        loadingProductDetails,
        loadingSubSubcategoryProducts,
        error, // Pass the error to the context
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
