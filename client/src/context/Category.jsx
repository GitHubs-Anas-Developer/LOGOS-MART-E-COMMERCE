import axios from "axios";
import { useState, createContext } from "react";

const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]); // Initialize state for categories
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for any errors

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/getallcategory`
      );
      setCategories(response.data.categories); // Set categories state with the fetched data
    } catch (error) {
      console.error(`Error fetching categories: ${error}`);
      setError(error); // Set error state
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  return (
    <CategoryContext.Provider
      value={{ fetchCategory, categories, loading, error }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
