import axios from "axios";
import { createContext, useState } from "react";

const SubsubcategoryContext = createContext();

export const SubsubcategoryProvider = ({ children }) => {
  const [subSubcategories, setSubSubcategories] = useState([]);

  const fetchSubsubcategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8050/api/v1/categories/subcategories/sub/all"
      );
      if (response.status === 200) {
        setSubSubcategories(response.data.subSubcategories); // Fixed typo here
      }
    } catch (error) {
      console.error("Error fetching sub-subcategories:", error);
    }
  };

  return (
    <SubsubcategoryContext.Provider
      value={{ subSubcategories, fetchSubsubcategories }}
    >
      {children}
    </SubsubcategoryContext.Provider>
  );
};

export default SubsubcategoryContext;
