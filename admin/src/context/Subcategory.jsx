import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const SubcategoryContext = createContext();

export const SubcategoryProvider = ({ children }) => {
  const [subcategories, setSubcategories] = useState([]);

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8050/api/v1/subcategories/all"
      );

      if (response.status === 200) {
        setSubcategories(response.data.subcategories); // Set the subcategories from response
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };



  return (
    <SubcategoryContext.Provider value={{ subcategories, fetchSubcategories }}>
      {children}
    </SubcategoryContext.Provider>
  );
};

export default SubcategoryContext;
