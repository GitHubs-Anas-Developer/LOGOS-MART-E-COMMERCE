import React, { useContext, useEffect, useState } from "react";
import SubcategoryContext from "../../context/Subcategory";
import SubsubcategoryContext from "../../context/Subsubcategory";
import { Link } from "react-router-dom";

function Categories() {
  const { fetchSubcategoriesAll, subcategoriesAll, loading, error } =
    useContext(SubcategoryContext);
  const { fetchSubsubcategories, subSubcategory, subSubLoading, subSubError } =
    useContext(SubsubcategoryContext);

  const [activeSubcategoryId, setActiveSubcategoryId] = useState(null);

  useEffect(() => {
    fetchSubcategoriesAll();
  }, []);

  const handleSubcategoryClick = (subcategoryId) => {
    setActiveSubcategoryId(subcategoryId);
    fetchSubsubcategories(subcategoryId);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-4">
        <div className="spinner">Loading categories...</div>
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center py-4">
        Error: {error.message}
      </div>
    );

  return (
    <div className="flex p-1 bg-gray-50 min-h-screen">
      {/* Left Sidebar for Categories */}
      <div className="w-24 sm:w-40 md:w-40 lg:w-40 xl:w-40 border-r border-gray-300 bg-white shadow-lg overflow-y-auto h-screen">
        <h1 className=" font-semibold mb-6 text-center text-gray-800">
          Categories
        </h1>
        <ul className="space-y-4 p-2 ">
          {subcategoriesAll && subcategoriesAll.length > 0 ? (
            subcategoriesAll.map((subcategory) => (
              <li
                key={subcategory._id}
                className="group cursor-pointer "
                onClick={() => handleSubcategoryClick(subcategory._id)} // On click fetch sub-subcategories
              >
                {/* Category Card */}
                <div className="relative">
                  <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-full p-3">
                    <img
                      src={subcategory.image} // Assuming each subcategory has an image URL
                      alt={subcategory.title}
                      className="w-full  object-contain "
                    />
                  </div>

                  {/* Hover effect to show the sub-subcategories */}
                  {activeSubcategoryId === subcategory._id && (
                    <div className="absolute inset-0 bg-black opacity-40 flex items-center justify-center text-white text-[13px] rounded-full p-3">
                      <span>Explore {subcategory.title}</span>
                    </div>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No subcategories available.
            </p>
          )}
        </ul>
      </div>

      {/* Right Content Area for Subcategories / Products */}
      <div className="flex-1 p-1 rounded-lg  ml-1">
        {/* Loading spinner for sub-subcategories */}
        {subSubLoading && activeSubcategoryId && (
          <div className="flex justify-center items-center py-8">
            <div className="spinner">Loading sub-subcategories...</div>
          </div>
        )}

        {/* Display error if there is an issue fetching sub-subcategories */}
        {subSubError && (
          <div className="text-red-500 text-center py-4">
            Error fetching sub-subcategories: {subSubError.message}
          </div>
        )}

        {/* Display Subcategories or Products */}
        {subSubcategory && subSubcategory.length > 0 && (
          <div>
            <h2 className=" font-semibold  text-gray-800">Sub-subcategories</h2>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
              {subSubcategory.map((subSub) => (
                <Link
                  to={`/subsubcategoryproducts/${subSub._id}`}
                  key={subSub._id}
                  className="p-1 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
                >
                  <img
                    src={subSub.image} // Assuming each subcategory has an image URL
                    alt={subSub.title}
                    className="w-full h-auto object-contain rounded-md"
                  />{" "}
                  <span className="block text-center  text-gray-800">
                    {subSub.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Categories;
