import React, { useState, useRef, useEffect, useContext } from "react";
import { CiSearch } from "react-icons/ci";
import SubcategoryContext from "../../../context/Subcategory";
import { IoMdArrowBack } from "react-icons/io";
import { useCallback } from "react";
import debounce from "lodash.debounce"; // Install lodash.debounce
import FilterProductsContext from "../../../context/FilterProducts";
import { Link } from "react-router-dom";

function SearchPopup() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { fetchSubcategoriesAll, subcategoriesAll } =
    useContext(SubcategoryContext);
  const { searchItems, items, loadingProducts, error } = useContext(
    FilterProductsContext
  );

  // Create a ref for the input field
  const searchInputRef = useRef(null);

  // Toggle the popup visibility
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Focus the input when the popup opens
  useEffect(() => {
    fetchSubcategoriesAll();
    if (isPopupOpen) {
      searchInputRef.current?.focus();
    }
  }, [isPopupOpen]);

  const debouncedSearch = useCallback(
    debounce((query) => {
      searchItems(query); // Call the search function after a delay
    }, 300), // 300ms delay
    []
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      debouncedSearch(query);
    }
  };

  return (
    <div>
      {/* Trigger Button */}
      <button
        onClick={togglePopup}
        className="text-white hover:text-gray-300 mt-1"
      >
        <CiSearch className="text-3xl text-blue-400" />
      </button>

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex justify-center  bg-gray-900 bg-opacity-60 backdrop-blur-sm transition-all ease-in-out">
          <div className="bg-white w-full max-w-lg  shadow-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b p-4 bg-green-100 text-white">
              <IoMdArrowBack
                className="text-2xl cursor-pointer mr-3 text-black"
                onClick={togglePopup}
              />
              <div className="relative w-full">
                <input
                  type="text"
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search for products"
                  className="w-full px-6 py-3  bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 rounded-3xl"
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 "></span>
              </div>
            </div>

            {/* Loading Spinner */}
            {loadingProducts && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
              </div>
            )}

            {/* Error Message */}
            {error && <p className="text-red-500 text-center py-3">{error}</p>}

            {/* Search Results */}
            <div className="max-h-80 overflow-y-auto p-4">
              {items.length > 0 ? (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center space-x-4 border-b pb-3 hover:bg-gray-100 cursor-pointer"
                    >
                      <Link
                        to={`/subsubcategoryproducts/${item.subSubcategoryId}`}
                        onClick={() => setIsPopupOpen(false)} // Close popup on link click
                        className="flex items-center space-x-4"
                      >
                        <img
                          src={item.cardImage}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <span className="text-gray-700 font-medium truncate max-w-[250px]">
                          {item.brand}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                !loadingProducts && (
                  <p className="text-gray-500 text-center">No items found</p>
                )
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mt-3 p-2">
              Browse Categories
            </h3>
            {/* Subcategory Section */}
            <div className="h-auto overflow-x-auto p-4 mb-8">
              {subcategoriesAll?.length > 0 ? (
                <div className="flex space-x-4">
                  {subcategoriesAll.map((subcategory, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center p-4 border rounded-lg shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer"
                    >
                      <img
                        src={subcategory.image}
                        alt={subcategory.title}
                        className="w-16 h-16 object-contain rounded-md mb-2"
                      />
                      <h5 className="text-gray-800 text-center text-sm font-semibold">
                        {subcategory.title}
                      </h5>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600">
                  No subcategories found
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchPopup;
