import React, { useContext, useEffect, useState } from "react";
import FilterProductsContext from "../../context/FilterProducts";
import { CiStar } from "react-icons/ci";

function Filters() {
  const initialPriceRange = [0, 200000]; // Dynamic price range
  const [priceRange, setPriceRange] = useState(initialPriceRange);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [rating, setRating] = useState([]);
  const [sortOption, setSortOption] = useState("");

  const { fetchFilterProducts, fetchBrands, brands } = useContext(
    FilterProductsContext
  );

  // Debounced filter fetch
  useEffect(() => {
    fetchBrands();
    const debounce = setTimeout(() => {
      fetchFilterProducts(rating, priceRange, sortOption, selectedBrand);
    }, 300); // 300ms debounce

    return () => clearTimeout(debounce);
  }, [rating, priceRange, sortOption, selectedBrand]);

  // Handle price range changes
  const handlePriceChange = (value, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = value;
    setPriceRange(newPriceRange);
  };

  const toggleBrandSelection = (brand) => {
    setSelectedBrand(
      (prevSelected) =>
        prevSelected.includes(brand)
          ? prevSelected.filter((b) => b !== brand) // Remove if already selected
          : [...prevSelected, brand] // Add if not selected
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setPriceRange(initialPriceRange);
    setSelectedBrand([]);
    setRating([]);
    setSortOption("");
  };

  console.log("selectedBrand", selectedBrand);

  return (
    <div className="rounded-md bg-gray-50  space-y-6 shadow-sm">
      {/* Price Range */}
      <div className="bg-white p-5  border border-gray-200">
        <label className="block text-md font-medium text-gray-800 ">
          Price Range
        </label>
        <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
        <div className="space-y-2">
          <input
            type="range"
            min={initialPriceRange[0]}
            max={initialPriceRange[1]}
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(Number(e.target.value), 0)}
            className="w-full accent-indigo-500"
          />
          <input
            type="range"
            min={initialPriceRange[0]}
            max={initialPriceRange[1]}
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(Number(e.target.value), 1)}
            className="w-full accent-indigo-500"
          />
        </div>
      </div>

      {/* Brand */}
      <div className="bg-white p-5  border border-gray-200">
        <label className="block text-md font-medium text-gray-800 mb-4">
          Brands
        </label>
        <ul className="space-y-3">
          {brands.map((brand, index) => (
            <li
              key={index}
              className="flex items-center"
              onClick={() => toggleBrandSelection(brand)}
            >
              <input
                type="checkbox"
                name="brand"
                value={brand}
                id={`brand-${index}`}
                checked={selectedBrand.includes(brand)} // Sync checkbox state
                className="h-4 w-4 accent-indigo-500"
              />
              <label
                htmlFor={`brand-${index}`}
                className="ml-2 text-sm text-gray-700 hover:text-indigo-500 cursor-pointer"
              >
                {brand}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Rating */}
      <div className="bg-white p-5  border border-gray-200">
        <label className="block text-md font-medium text-gray-800 mb-4">
          Rating
        </label>
        <ul className="space-y-3">
          {[1, 2, 3, 4].map((ratingValue, index) => (
            <li
              key={index}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md"
              onChange={() => setRating(ratingValue)}
            >
              <input
                type="checkbox"
                name="rating"
                value={ratingValue}
                id={`rating-${index}`}
                className="h-4 w-4 accent-yellow-500"
              />
              <label
                htmlFor={`rating-${index}`}
                className="flex items-center text-sm text-gray-700 hover:text-indigo-500"
              >
                {ratingValue}
                <CiStar className="ml-1 text-yellow-400" /> & above
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Sorting Options */}
      <div className="bg-white p-5  border border-gray-200">
        <label className="block text-md font-medium text-gray-800 mb-4">
          Sort By
        </label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full p-2 rounded-md border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Default</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="rating">Rating</option>
          <option value="title">Alphabetical</option>
        </select>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={clearFilters}
        className="w-full bg-red-500 text-white py-2  hover:bg-red-600 transition duration-300"
      >
        Clear Filters
      </button>
    </div>
  );
}

export default Filters;
