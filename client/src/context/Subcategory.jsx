import axios from "axios";
import { createContext, useState } from "react";

const SubcategoryContext = createContext();

export const SubcategoryContextProvider = ({ children }) => {
  const [subCategories, setSubcategories] = useState([]);
  const [subcategoriesAll, setSubcategoriesAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for any errors

  const fetchSubcategories = async (subcategoryId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/category/subcategory/${subcategoryId}`
      );
      setSubcategories(response.data.subcategories);
      console.log("subcategories", response.data.subcategories);
    } catch (error) {
      console.error(`Error fetching Subcategories: ${error}`);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubcategoriesAll = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/subcategories/all`
      );
      setSubcategoriesAll(response.data.subcategories);
    } catch (error) {
      console.error(`Error fetching Subcategories all: ${error}`);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SubcategoryContext.Provider
      value={{
        fetchSubcategories,
        subCategories,
        loading,
        error,
        fetchSubcategoriesAll,
        subcategoriesAll,
      }}
    >
      {children}
    </SubcategoryContext.Provider>
  );
};

export default SubcategoryContext;
