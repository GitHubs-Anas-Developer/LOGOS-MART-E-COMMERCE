import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CgAddR } from "react-icons/cg";
import ProductContext from "../../context/Product";

function Products() {
  const { fetchProducts, products } = useContext(ProductContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Edit Button Click
  const handleEdit = (id) => {
    console.log(`Edit product with ID: ${id}`);
    // Navigate to edit page or open a modal (customize as needed)
  };

  // Handle Delete Button Click
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log(`Delete product with ID: ${id}`);
      // Add logic to call API for deleting the product
    }
  };

  return (
    <div>
      <div className="container mx-auto p-5 max-h-[640px] overflow-y-auto bg-white rounded-lg pb-4 px-6 dark:bg-neutral-800">
        <h1 className="text-center font-bold text-4xl mb-8 text-gray-700">
          Products
        </h1>

        <div className="flex justify-end mb-6">
          <Link
            to={"/newProduct"}
            aria-label="Add new product"
            className="text-white bg-blue-500 hover:bg-blue-700 flex items-center px-4 py-2 rounded-lg shadow-lg"
          >
            <CgAddR className="h-6 w-6 mr-2" />
            <span>New Product</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="p-4 bg-gray-100 rounded-lg shadow-md dark:bg-gray-700"
              >
                <img
                  src={product.cardImage}
                  alt={product.title}
                  className="h-40 w-full object-contain mb-4 rounded-lg"
                />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {product.title.length > 20
                    ? `${product.title.slice(0, 25)}...`
                    : product.title}
                </h2>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
