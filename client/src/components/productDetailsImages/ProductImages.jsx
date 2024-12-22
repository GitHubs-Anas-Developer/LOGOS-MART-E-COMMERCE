import React, { useState, useContext, useEffect } from "react";
import { ProductImagesContext } from "../../context/productImages";

function ProductImages() {
  const { fetchProductImages, productImages, loading, error } =
    useContext(ProductImagesContext);

  // Fetch images whenever the productId changes
  useEffect(() => {
    fetchProductImages();
  }, []);

  return (
    <div className="product-images-container">
      <h2>Product Images</h2>

      {/* Loading state */}
      {loading && <p>Loading images...</p>}

      {/* Error state */}
      {error && <p className="error">{error}</p>}

      {/* Display images */}
      <div className="images-container">
        {productImages.length === 0 ? (
          <p>No images available for this product.</p>
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
