import axios from "axios";
import { createContext, useState } from "react"; // Import useState and useEffect

// Create the context
 const CategoryContext = createContext();

export  const CategoryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  // Function to fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8050/api/v1/getallcategory"
      );
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <CategoryContext.Provider value={{ categories, fetchCategories }}>
      {children} {/* This renders whatever is wrapped in CategoryContextProvider */}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
