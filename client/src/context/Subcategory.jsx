import axios from "axios";
import { createContext, useState } from "react";
import api from "../utils/axiosInstance";

const SubcategoryContext = createContext();

export const SubcategoryContextProvider = ({ children }) => {
  const [subCategories, setSubcategories] = useState([]);
  const [subcategoriesAll, setSubcategoriesAll] = useState([]);

  // Loading states for individual and all subcategories
  const [subcategoryLoading, setSubcategoryLoading] = useState(true);
  const [subcategoriesAllLoading, setSubcategoriesAllLoading] = useState(true);

  // Error state for handling errors
  const [error, setError] = useState(null);

  const fetchSubcategories = async (subcategoryId) => {
    setSubcategoryLoading(true); // Start loading for subcategories
    try {
      const response = await api.get(
        `/api/v1/category/subcategory/${subcategoryId}`
      );
      setSubcategories(response.data.subcategories);
      console.log("subcategories:", response.data.subcategories);
    } catch (error) {
      console.error(`Error fetching subcategories: ${error.message}`);
      setError(`Error fetching subcategories: ${error.message}`);
    } finally {
      setSubcategoryLoading(false); // End loading for subcategories
    }
  };

  const fetchSubcategoriesAll = async () => {
    setSubcategoriesAllLoading(true); // Start loading for all subcategories
    try {
      const response = await api.get(`/api/v1/subcategories/all`);
      setSubcategoriesAll(response.data.subcategories);
    } catch (error) {
      console.error(`Error fetching all subcategories: ${error.message}`);
      setError(`Error fetching all subcategories: ${error.message}`);
    } finally {
      setSubcategoriesAllLoading(false); // End loading for all subcategories
    }
  };

  return (
    <SubcategoryContext.Provider
      value={{
        fetchSubcategories,
        subCategories,
        subcategoryLoading, // Loading state for subcategories
        subcategoriesAll,
        subcategoriesAllLoading, // Loading state for all subcategories
        error,
        fetchSubcategoriesAll,
      }}
    >
      {children}
    </SubcategoryContext.Provider>
  );
};

export default SubcategoryContext;
