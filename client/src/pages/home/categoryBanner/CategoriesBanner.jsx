import React, { useContext, useEffect, useState } from "react";
import CategoryContext from "../../../context/Category";
import SubcategoryContext from "../../../context/Subcategory";
import SubsubcategoryContext from "../../../context/Subsubcategory";
import { Link } from "react-router-dom";

function CategoriesBanner() {
  const { fetchCategory, categories, loading, error } =
    useContext(CategoryContext);
  const { fetchSubcategories, subCategories } = useContext(SubcategoryContext);
  const { fetchSubsubcategories, subSubcategory } = useContext(
    SubsubcategoryContext
  );

  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [hoveredSubcategoryId, setHoveredSubcategoryId] = useState(null);

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleCategoryHover = (categoryId) => {
    setHoveredCategoryId(categoryId);
    fetchSubcategories(categoryId);
  };

  const handleSubcategoryHover = (subcategoryId) => {
    setHoveredSubcategoryId(subcategoryId);
    fetchSubsubcategories(subcategoryId);
  };

  const handleMouseLeaveCategory = () => {
    setHoveredCategoryId(null);
    setHoveredSubcategoryId(null);
  };

  const handleMouseLeaveSubcategory = () => {
    setHoveredSubcategoryId(null);
  };

  if (loading)
    return <div className="text-center py-4">Loading categories...</div>;
  if (error)
    return (
      <div className="text-red-500 text-center py-4">
        Error: {error.message}
      </div>
    );

  return (
    <div className="hidden md:flex items-start bg-gradient-to-r from-purple-500 to-blue-500 p-4 space-x-6 shadow-lg">
      {categories.map((category) => (
        <div
          key={category._id}
          className="relative group"
          onMouseLeave={handleMouseLeaveCategory} // Hides category dropdown on mouse out
        >
          {/* Category title with hover effect */}
          <label
            className="p-3 text-xl font-bold text-white cursor-pointer transition duration-200 transform hover:scale-105 hover:text-yellow-300"
            onMouseEnter={() => handleCategoryHover(category._id)}
          >
            {category.title}
          </label>

          {/* Dropdown for Subcategories */}
          {hoveredCategoryId === category._id && (
            <div
              className="absolute flex flex-col bg-white text-gray-800 p-4 mt-2 left-0 w-48 transition-opacity duration-300 ease-out opacity-95 z-10"
              onMouseLeave={handleMouseLeaveSubcategory} // Hides subcategory dropdown on mouse out
            >
              <div className="absolute -top-2 left-4 w-3 h-3 bg-white transform rotate-45"></div>
              {subCategories.map((subcategory) => (
                <div key={subcategory._id} className="relative group">
                  <a
                    href="#"
                    className="block text-sm py-2 px-2 hover:bg-gray-100 transition duration-150"
                    onMouseEnter={() => handleSubcategoryHover(subcategory._id)}
                  >
                    {subcategory.title}
                  </a>

                  {/* Dropdown for Sub-subcategories */}
                  {hoveredSubcategoryId === subcategory._id && (
                    <div className="absolute left-full top-0 ml-4 flex flex-col bg-white p-3 w-48 transition-transform duration-300 ease-out transform translate-y-2">
                      {subSubcategory.map((subSub) => (
                        <Link
                          to={`/subsubcategoryProducts/${subSub._id}`}
                          key={subSub._id}
                          href="#"
                          className="block text-sm py-2 px-2 hover:bg-blue-50 transition duration-200"
                        >
                          {subSub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CategoriesBanner;
