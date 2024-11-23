import React, { useContext, useEffect } from "react";
import { CgAddR } from "react-icons/cg";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CategoryContext from "../../context/Category";

function Category() {
  const { categories, fetchCategories } = useContext(CategoryContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="container mx-auto p-5 max-h-[640px] overflow-y-auto bg-white rounded-lg pb-4 px-6 dark:bg-neutral-800">
        <h1 className="text-center font-bold text-4xl mb-8 text-gray-700">
          Categories
        </h1>

        <div className="flex justify-end mb-6">
          <Link
            to={"/newCategory"}
            aria-label="Add new category"
            className="text-white bg-blue-500 hover:bg-blue-700 flex items-center px-4 py-2 rounded-lg shadow-lg"
          >
            <CgAddR className="h-6 w-6 mr-2" />
            <span>New Category</span>
          </Link>
        </div>

        <div className="space-y-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between hover:bg-gray-50 transition-all duration-300"
            >
              <div className="flex items-center">
              <img
                src={category.image} // Corrected here
                alt={category.title}
                className="w-16 h-16 object-cover rounded mr-4"
              />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {category.title}
                  </h2>
                  <p className="text-gray-500">ID: {category._id}</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <button className="text-yellow-500 hover:text-yellow-600 text-xl">
                  <AiFillEdit />
                </button>
                <button className="text-red-500 hover:text-red-600 text-xl">
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Category;
