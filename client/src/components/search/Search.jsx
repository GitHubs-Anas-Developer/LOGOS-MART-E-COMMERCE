import React from "react";
import { IoSearchOutline } from "react-icons/io5";

function Search() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-96">
        <input
          type="text"
          id="hs-search-box-with-loading-4"
          name="hs-search-box-with-loading-4"
          className="w-full py-3 pl-12 pr-4 rounded-lg border-2 border-gray-300 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-neutral-800 dark:text-white dark:placeholder-gray-500 dark:border-neutral-600 focus:dark:ring-indigo-400 transition-all duration-300"
          placeholder="Search for Products"
          aria-label="Search"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
          <IoSearchOutline className="text-xl" />
        </span>
      </div>
    </div>
  );
}

export default Search;
