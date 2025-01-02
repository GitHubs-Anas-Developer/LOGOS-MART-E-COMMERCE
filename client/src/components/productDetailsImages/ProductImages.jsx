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
      <div className="images-container">
        {productImages.length === 0 ? (
          ""
        ) : (
          <div className="images-grid">
            {productImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product Image ${index + 1}`}
                className="product-image ml-auto mr-auto"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImages;
