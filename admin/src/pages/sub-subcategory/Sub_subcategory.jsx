import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CgAddR } from "react-icons/cg";
import SubsubcategoryContext from "../../context/Subsubcategory";
import SubcategoryContext from "../../context/Subcategory";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

function Sub_subcategory() {
  const { subSubcategories, fetchSubsubcategories } = useContext(
    SubsubcategoryContext
  );

  const { subcategories, fetchSubcategories } = useContext(SubcategoryContext);

  useEffect(() => {
    fetchSubsubcategories();
    fetchSubcategories();
  }, []);

  const [searchTerm, setSearchTerm] = useState(""); // Local state for search
  const [selectedCategory, setSelectedCategory] = useState(""); // Local state for selected category

  const filteredSubSubcategories = subSubcategories.filter((subSubctegory) => {
    const matchesSearch = subSubctegory.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? subSubctegory.parentSubcategory === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="container mx-auto p-5 max-h-[640px] overflow-y-auto bg-white rounded-lg pb-4 px-6 dark:bg-neutral-800">
        <h1 className="text-center font-bold text-4xl mb-8 text-gray-700">
          Sub-Subcategories
        </h1>
        <div className="flex justify-between mb-6">
          <Link
            className="text-white bg-blue-500 hover:bg-blue-700 flex items-center px-4 py-2 rounded-lg shadow-lg"
            to={"/NewSubsubcategory"}
          >
            <CgAddR className="h-6 w-6 mr-2" />
            <span>New Sub-Subcategory</span>
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
              <option value="">-- Select a subcategory --</option>
              {subcategories.map((subcategory, index) => {
                return (
                  <option key={index} value={subcategory._id}>
                    {subcategory.title}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
    
      <div className="flex w-full overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 text-left">NO</th>
              <th className="py-3 px-4 text-left">SUBCATEGORY SUB ID</th>
              <th className="py-3 px-4 text-left">TITLE</th>
              <th className="py-3 px-4 text-left">IMAGE</th>
              <th className="py-3 px-4 text-left">SUBACTEGORY ID</th>
              <th className="py-3 px-4 text-left">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubSubcategories.length > 0 ? (
              filteredSubSubcategories.map((subSubcategory, index) => {
                return (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <th className="py-3 px-4 text-black">{index + 1}</th>
                    <td className="py-3 px-4  text-black">
                      {subSubcategory._id}
                    </td>
                    <td className="py-3 px-4  text-black">
                      {subSubcategory.title}
                    </td>
                    <td>
                      <img
                        src={subSubcategory.image}
                        alt=""
                        className="w-16 h-16 object-contain rounded"
                      />
                    </td>
                    <td className="py-3 px-4  text-black">
                      {subSubcategory.parentSubcategory}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex space-x-4">
                        <button
                          className="text-yellow-500 hover:text-yellow-600 text-xl  border p-3"
                          onClick={() => handleEdit(subSubcategory._id)}
                        >
                          <AiFillEdit />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-600 text-xl border p-3"
                          onClick={() => handleDelete(subSubcategory._id)}
                        >
                          <AiFillDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No sub-subcategories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
}

export default Sub_subcategory;
