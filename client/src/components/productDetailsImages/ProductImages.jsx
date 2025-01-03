import React, { useState, useContext, useEffect } from "react";
import { ProductImagesContext } from "../../context/productImages";

function ProductImages({ productId }) {
  const { fetchProductImages, productImages, loading, error } =
    useContext(ProductImagesContext);

  // Fetch images whenever the productId changes
  useEffect(() => {
    fetchProductImages(productId);
  }, []);

  return (
    <div className="product-images-container">
      {/* Loading state */}
      {loading && <p>Loading images...</p>}

      {/* Display images */}
      <div className="images-container p-4 bg-white rounded-lg shadow-lg">
  <h1 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-700">
    Product Images
  </h1>

  {productImages.length === 0 ? (
    <p className="text-gray-500 text-center">No images available</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {productImages.map((image, index) => (
        <div key={index} className="w-full">
          <img
            src={image}
            alt={`Product Image ${index + 1}`}
            className="w-full h-auto rounded-lg object-cover border shadow-sm hover:shadow-md transition-shadow duration-300"
          />
        </div>
      ))}
    </div>
  )}
</div>

    </div>
  );
}

export default ProductImages;
