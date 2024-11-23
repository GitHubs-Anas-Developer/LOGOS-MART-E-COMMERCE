import { createContext, useState } from "react";
import axios from "axios";

const SubsubcategoryContext = createContext();

export const SubsubcategoryContextProvider = ({ children }) => {
  const [subSubcategory, setSubsubcategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubsubcategories = async (subcategoryId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/subcategory/${subcategoryId}`
      );
      setSubsubcategory(response.data.subSubcategories);
    } catch (error) {
      console.error(`Error fetching Subsubcategories: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SubsubcategoryContext.Provider
      value={{
        fetchSubsubcategories,
        subSubcategory,
      }}
    >
      {children}
    </SubsubcategoryContext.Provider>
  );
};

export default SubsubcategoryContext;
