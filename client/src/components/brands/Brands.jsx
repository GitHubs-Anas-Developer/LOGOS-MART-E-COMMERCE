import React, { useContext, useEffect } from "react";
import FilterProductsContext from "../../context/FilterProducts";

function Brands() {
  const { fetchBrands, brands, loading, error } = useContext(
    FilterProductsContext
  );

  // Fetch brands when the component is mounted
  useEffect(() => {
    fetchBrands();
  }, []);

  // Loading state
  if (loading) {
    return <div className="text-center text-lg text-gray-500">Loading...</div>;
  }

  // Error state
  if (error) {
    return (
      <div className="text-center text-red-600 text-lg">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="brands-container py-16 bg-gradient-to-r from-pink-50 via-purple-100 to-indigo-100 p-4">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Available Brands
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
        {brands?.map((brand) => (
          <div
            key={brand.id}
            className="brand-card bg-gradient-to-r  shadow-xl rounded-lg p-6 text-center transform transition-all duration-300 hover:bg-gradient-to-t from-blue-200 via-teal-100 to-green-200 hover:shadow-2xl hover:scale-105"
          >
            <h3 className="text-lg font-semibold text-gray-800">{brand}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Brands;
