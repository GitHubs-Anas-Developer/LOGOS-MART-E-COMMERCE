import axios from "axios";
import { createContext, useState } from "react";

const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [subsubcategoryProducts, SetsubsubcategoryProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/products`
      );
      if (response.status === 200) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSingleProductDetails = async (productId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/details/${productId}`
      );
      if (response.status === 200) {
        setProductDetails(response.data.productDetails);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubsubcategoryproducts = async (subsubcategoryId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/products/subsubcategory/${subsubcategoryId}`
      );
      SetsubsubcategoryProducts(response.data.subsubcategoryProducts);
    } catch (error) {
      console.error(`Error fetching Subsubcategories: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        fetchProducts,
        fetchSingleProductDetails,
        productDetails,
        fetchSubsubcategoryproducts,
        subsubcategoryProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
