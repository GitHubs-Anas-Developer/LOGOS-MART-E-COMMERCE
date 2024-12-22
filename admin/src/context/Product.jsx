import axios from "axios";
import { createContext, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [addProduct, setAddProduct] = useState({});
  const [products, setProducts] = useState([]);

  const addProductData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8050/api/v1/create/product",
        addProduct,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Product added successfully!");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
    }
  };

  // Function to fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8050/api/v1/products");
      if (response.status === 200) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products. Please try again.");
    }
  };

  return (
    <ProductContext.Provider
      value={{ setAddProduct, addProductData, fetchProducts, products }}
    >
      {children}
      <Toaster />
    </ProductContext.Provider>
  );
};

export default ProductContext;
