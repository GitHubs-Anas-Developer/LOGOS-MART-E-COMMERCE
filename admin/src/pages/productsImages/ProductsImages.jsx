import React from "react";
import { Link } from "react-router-dom";
import { CgAddR } from "react-icons/cg";

function ProductsImages({ images }) {
  return (
    <div className="container mx-auto p-5 max-h-[640px] overflow-y-auto bg-white rounded-lg pb-4 px-6 dark:bg-neutral-800">
      <h1 className="text-center font-bold text-4xl mb-8 text-gray-700">
        Product Images
      </h1>

      <div className="flex justify-end mb-6">
        <Link
          to={"/newProductImages"}
          aria-label="Add new product"
          className="text-white bg-blue-500 hover:bg-blue-700 flex items-center px-4 py-2 rounded-lg shadow-lg"
        >
          <CgAddR className="h-6 w-6 mr-2" />
          <span>New Product Images</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 rounded-lg shadow-md dark:bg-gray-700 transition-transform hover:scale-105"
            >
              <img
                src={image.url}
                alt={image.alt || `Product ${index + 1}`}
                className="h-40 w-full object-cover rounded-lg mb-4"
              />
              <h2 className="text-center text-sm text-gray-800 dark:text-gray-300">
                {image.caption || `Image ${index + 1}`}
              </h2>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
            No product images available.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductsImages;
