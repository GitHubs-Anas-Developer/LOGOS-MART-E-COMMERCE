import React, { useContext, useEffect } from "react";
import FilterProductsContext from "../../context/FilterProducts";

function Brands() {
  const { fetchBrands, brands, loading, error } = useContext(
    FilterProductsContext
  );

  useEffect(() => {
    fetchBrands();
  }, []);

  if (loading) {
    return <div className="text-center text-lg text-gray-500">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 text-lg">
        Error: {error?.message || "Something went wrong."}
      </div>
    );
  }

  if (brands?.length === 0) {
    return (
      <div className="text-center text-gray-500 text-lg">
        No brands available at the moment.
      </div>
    );
  }

  return (
    <div className="brands-container py-16 bg-gradient-to-r from-green-100 to-green-200 ">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Available Brands
      </h2>
      <div className="overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-4">
        {brands?.map((brand) => (
          <div
            key={brand.id}
            className="inline-block bg-gradient-to-br from-purple-50 via-pink-100 to-purple-200 shadow-lg rounded-xl m-3 p-5 text-center transform transition-all duration-300 hover:scale-110 hover:bg-gradient-to-br from-pink-200 to-purple-400 hover:shadow-2xl"
          >
            <h3 className="text-xl font-bold text-gray-900">{brand}</h3>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Brands;
