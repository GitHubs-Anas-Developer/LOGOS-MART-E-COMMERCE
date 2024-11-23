import axios from "axios";
import { createContext, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [addProduct, setAddProduct] = useState({});
  console.log("addProduct",addProduct);
  
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

  return (
    <ProductContext.Provider value={{ setAddProduct, addProductData }}>
      {children}
      <Toaster />
    </ProductContext.Provider>
  );
};

export default ProductContext;
