import React, { useContext, useEffect, useState } from "react"; // Added useState
import { Link } from "react-router-dom";
import { CgAddR } from "react-icons/cg";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import SubcategoryContext from "../../context/Subcategory";
import CategoryContext from "../../context/Category";

function Subcategory() {
  const { subcategories, fetchSubcategories } = useContext(SubcategoryContext);
  const { categories, fetchCategories } = useContext(CategoryContext);

  const [searchTerm, setSearchTerm] = useState(""); // Local state for search
  const [selectedCategory, setSelectedCategory] = useState(""); // Local state for selected category

  useEffect(() => {
    fetchSubcategories();
    fetchCategories();
  }, [fetchSubcategories, fetchCategories]);

  // Handler for Edit button
  const handleEdit = (id) => {
    console.log(`Edit subcategory with ID: ${id}`);
    // Implement your edit functionality here, e.g., navigate to edit page
  };

  // Handler for Delete button
  const handleDelete = (id) => {
    console.log(`Delete subcategory with ID: ${id}`);
    // Implement your delete functionality here
  };

  // Filtered subcategories based on search term and selected category
  const filteredSubcategories = subcategories.filter((subcategory) => {
    const matchesSearch = subcategory.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? subcategory.parentCategory === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto p-5 max-h-[640px] overflow-y-auto bg-white rounded-lg pb-4 px-6 dark:bg-neutral-800">
      <h1 className="text-center font-bold text-4xl mb-8 text-gray-700">
        Subcategories
      </h1>

      <div className="flex justify-between mb-6">
        <Link
          to={"/newSubcategory"}
          aria-label="Add new subcategory"
          className="text-white bg-blue-500 hover:bg-blue-700 flex items-center px-4 py-2 rounded-lg shadow-lg"
        >
          <CgAddR className="h-6 w-6 mr-2" />
          <span>New Subcategory</span>
        </Link>

        <div className="flex space-x-2">
          <input
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />
          <select
            className="select border border-gray-300 rounded px-3 py-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">-- Select a category --</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 text-left">NO</th>
              <th className="py-3 px-4 text-left">SUBCATEGORY ID</th>
              <th className="py-3 px-4 text-left">TITLE</th>
              <th className="py-3 px-4 text-left">IMAGE</th>
              <th className="py-3 px-4 text-left">PARENT ID</th>
              <th className="py-3 px-4 text-left">ACTION</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredSubcategories.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-3 px-4 text-center">
                  No subcategories available.
                </td>
              </tr>
            ) : (
              filteredSubcategories.map((subcategory, index) => (
                <tr
                  key={subcategory._id}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{subcategory._id}</td>
                  <td className="py-3 px-4">{subcategory.title}</td>
                  <td className="py-3 px-4">
                    <img
                      src={`${subcategory.image}`}
                      alt={subcategory.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4">{subcategory.parentCategory}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-4">
                      <button
                        className="text-yellow-500 hover:text-yellow-600 text-xl"
                        onClick={() => handleEdit(subcategory._id)}
                      >
                        <AiFillEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600 text-xl"
                        onClick={() => handleDelete(subcategory._id)}
                      >
                        <AiFillDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Subcategory;
