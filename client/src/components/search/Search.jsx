import React, { useState, useCallback, useContext, useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import FilterProductsContext from "../../context/FilterProducts";

function Search({ placeholder = "Search for Products", setIsPopupOpen }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchItems, items, loadingProducts, error } = useContext(
    FilterProductsContext
  );

  // Create a ref for the search input field
  const searchInputRef = useRef(null);

  // Handle input change and update search query
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Trigger debounced search
    debouncedSearch(query);
  };

  // Debounce the search function for better performance
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (searchItems) {
        searchItems(query);
      }
    }, 300),
    [searchItems]
  );

  // Clear the search input and reset results
  const clearSearch = () => {
    setSearchQuery(""); // Reset the input field
    if (searchQuery) {
      searchItems(""); // Clear the search results
    }
    // Focus the search input after clearing
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
    // Clear error when search is cleared
    if (error) {
      setError(null); // Reset error state if available
    }
  };

  console.log("searchQuery", searchQuery);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Search Input */}
      <div className="relative w-full sm:w-96">
        <input
          type="text"
          className="w-full py-3 pl-12 pr-10 rounded-3xl border-2 border-gray-300 bg-white text-sm text-gray-700 placeholder-gray-400 "
          placeholder={placeholder}
          aria-label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          ref={searchInputRef} // Attach the ref to the input element
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
          <IoSearchOutline className="text-xl" />
        </span>
        {searchQuery && (
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            onClick={clearSearch} // Call clearSearch here
            aria-label="Clear Search"
          >
            <AiOutlineClose className="text-xl" />
          </button>
        )}
      </div>

      {/* Feedback Section */}
      <div className="relative mt-2 w-full max-w-lg">
        {/* Results */}
        {items.length > 0 && (
          <ul
            className="absolute z-10 w-full bg-white border rounded-lg shadow-lg dark:bg-neutral-800 dark:border-neutral-600 max-h-64 overflow-auto"
            aria-live="polite"
          >
            {loadingProducts && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
              </div>
            )}
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-700 cursor-pointer"
                tabIndex={0}
                aria-label={`Navigate to ${item.brand || "product"} details`}
              >
                <Link
                  to={`/subsubcategoryproducts/${item.subSubcategoryId}`}
                  onClick={() => setIsPopupOpen && setIsPopupOpen(true)}
                  className="flex items-center space-x-4"
                >
                  <img
                    src={item.cardImage}
                    alt={item.brand}
                    className="w-10 h-10 rounded object-cover"
                    loading="lazy"
                  />
                  <span>{item.title || "Unknown Brand"}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Search;
