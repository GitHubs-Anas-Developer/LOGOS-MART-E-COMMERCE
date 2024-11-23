import React, { useContext, useEffect, useState } from "react";
import FilterProductsContext from "../../context/Filterproducts";

function Filters() {
  const brands = ["Nike", "Adidas", "Puma", "Reebok"];
  const initialPriceRange = [0, 200000]; // Dynamic price range
  const [priceRange, setPriceRange] = useState(initialPriceRange);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [rating, setRating] = useState(1);
  const [sortOption, setSortOption] = useState("");

  const { fetchFilterProducts } = useContext(FilterProductsContext);

  // Debounced filter fetch
  useEffect(() => {
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

  // Clear all filters
  const clearFilters = () => {
    setPriceRange(initialPriceRange);
    setSelectedBrand("");
    setRating(1);
    setSortOption("");
  };

  return (
    <div className="bg-blue-50 p-6 rounded-lg">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Filters</h3>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-600 mb-2">
          Price Range
        </label>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">₹{priceRange[0]}</span>
          <span className="text-sm text-gray-500">₹{priceRange[1]}</span>
        </div>
        <input
          type="range"
          min={initialPriceRange[0]}
          max={initialPriceRange[1]}
          value={priceRange[0]}
          onChange={(e) => handlePriceChange(Number(e.target.value), 0)}
          className="w-full bg-gray-200 rounded-lg h-2"
        />
        <input
          type="range"
          min={initialPriceRange[0]}
          max={initialPriceRange[1]}
          value={priceRange[1]}
          onChange={(e) => handlePriceChange(Number(e.target.value), 1)}
          className="w-full bg-gray-200 rounded-lg h-2 mt-2"
        />
      </div>

      {/* Brand */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-600 mb-2">
          Brand
        </label>
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-600 mb-2">
          Rating
        </label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-yellow-400 focus:ring-2 focus:ring-blue-500"
        >
          <option value={1} className="text-yellow-400">
            {"★☆☆☆☆"} & Up
          </option>
          <option value={2} className="text-yellow-400">
            {"★★☆☆☆"} & Up
          </option>
          <option value={3} className="text-yellow-400">
            {"★★★☆☆"} & Up
          </option>
          <option value={4} className="text-yellow-400">
            {"★★★★☆"} & Up
          </option>
          <option value={5} className="text-yellow-400">
            {"★★★★★"}
          </option>
        </select>
      </div>

      {/* Sorting Options */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-600 mb-2">
          Sort By
        </label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-500"
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
        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300 mt-4"
      >
        Clear Filters
      </button>
    </div>
  );
}

export default Filters;
