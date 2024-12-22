import React, { useContext, useEffect, useState } from "react";
import FilterProductsContext from "../../context/FilterProducts";
import { CiStar } from "react-icons/ci";
function Filters() {
  const initialPriceRange = [0, 200000]; // Dynamic price range
  const [priceRange, setPriceRange] = useState(initialPriceRange);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [rating, setRating] = useState(1);
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

  // Clear all filters
  const clearFilters = () => {
    setPriceRange(initialPriceRange);
    setSelectedBrand("");
    setRating(1);
    setSortOption("");
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all">
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
        <label className="block text-lg font-medium text-gray-600 mb-2 underline underline-offset-4 decoration-blue-500 hover:decoration-blue-700">
          Brands
        </label>

        <ul class="space-y-2">
          {brands.map((brand, index) => (
            <li key={index} class="flex items-center gap-2">
              <input
                type="checkbox"
                name="brand"
                value={brand}
                id={`brand-${index}`}
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor={`brand-${index}`}
                class="text-gray-700 hover:text-blue-500 cursor-pointer"
              >
                {brand}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-600 mb-2 underline underline-offset-4 decoration-blue-500 hover:decoration-blue-700">
          Rating
        </label>
        <ul className="space-y-2">
          {[1, 2, 3, 4, 5].map((rating, index) => (
            <li key={index} className="flex items-center gap-3">
              <input
                type="checkbox"
                name="rating"
                value={rating}
                id={`rating-${index}`}
                className="h-5 w-5 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
              />
              <label
                htmlFor={`rating-${index}`}
                className="flex items-center text-gray-800 hover:text-yellow-600 cursor-pointer"
              >
                {rating}
                <CiStar className="ml-1 text-yellow-400" /> & above
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Sorting Options */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-600 mb-2 underline underline-offset-4 decoration-blue-500 hover:decoration-blue-700">
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
      <label className="block text-lg font-medium text-gray-600 mb-2 underline underline-offset-4 decoration-blue-500 hover:decoration-blue-700">
        Discount
      </label>
      <ul className="space-y-3">
        {[20, 30, 40, 50, 60, 70, 80].map((discount, index) => (
          <li
            key={index}
            className="flex items-center gap-4 p-2 rounded-lg border border-gray-300 hover:bg-gray-100 cursor-pointer transition-all"
          >
            <input
              type="checkbox"
              name="discount"
              value={discount}
              id={`discount-${index}`}
              className="h-5 w-5 text-green-500 focus:ring-green-400 border-gray-300 rounded-sm"
            />
            <label
              htmlFor={`discount-${index}`}
              className="text-lg font-medium text-gray-800 hover:text-green-500"
            >
              {discount}% Off
            </label>
          </li>
        ))}
      </ul>

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
