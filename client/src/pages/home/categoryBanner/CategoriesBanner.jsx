import React, { useContext, useEffect, useState } from "react";
import CategoryContext from "../../../context/Category";
import SubcategoryContext from "../../../context/Subcategory";
import SubsubcategoryContext from "../../../context/Subsubcategory";
import { Link } from "react-router-dom";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

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

  const resetHover = () => {
    setHoveredCategoryId(null);
    setHoveredSubcategoryId(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-6">Loading categories...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="bg-orange-500 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="hidden md:flex items-center space-x-6 py-4">
          {categories.map((category) => (
            <div
              key={category._id}
              className="relative group"
              onMouseLeave={resetHover}
            >
              {/* Category Tab */}
              <div
                className="px-4 py-2 text-sm font-medium text-white  cursor-pointer "
                onMouseEnter={() => handleCategoryHover(category._id)}
              >
                {category.title}
                <FiChevronDown className="inline ml-2 text-gray-500" />
              </div>

              {/* Subcategories Dropdown */}
              {hoveredCategoryId === category._id && (
                <div
                  className="absolute left-0  w-48 bg-white  shadow-lg z-20"
                  onMouseLeave={resetHover}
                >
                  {subCategories.length > 0 ? (
                    subCategories.map((subcategory) => (
                      <div
                        key={subcategory._id}
                        className="relative group"
                        onMouseEnter={() =>
                          handleSubcategoryHover(subcategory._id)
                        }
                      >
                        <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          {subcategory.title}
                          <FiChevronRight className="text-gray-400" />
                        </div>

                        {/* Sub-subcategories Dropdown */}
                        {hoveredSubcategoryId === subcategory._id && (
                          <div className="absolute left-full top-0 mt-0 w-48 bg-white  shadow-lg">
                            {subSubcategory.length > 0 ? (
                              subSubcategory.map((subSub) => (
                                <Link
                                  key={subSub._id}
                                  to={`/subsubcategoryProducts/${subSub._id}`}
                                  className="block px-4 py-2 text-sm hover:bg-blue-50"
                                >
                                  {subSub.title}
                                </Link>
                              ))
                            ) : (
                              <div className="text-sm text-gray-500 px-4 py-2">
                                No items
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500 px-4 py-2">
                      No subcategories
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoriesBanner;
