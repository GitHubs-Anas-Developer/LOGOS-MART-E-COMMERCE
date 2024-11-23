import React, { useContext, useEffect, useState } from "react";
import SubcategoryContext from "../../../context/Subcategory";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import CategoryContext from "../../../context/Category";

function NewSubsubcategory() {
  const { subcategories, fetchSubcategories } = useContext(SubcategoryContext);
  const { categories, fetchCategories } = useContext(CategoryContext);

  // Only fetch subcategories and categories once, when the component mounts
  useEffect(() => {
    fetchSubcategories();
    fetchCategories();
  }, []); // Empty dependency array ensures this only runs once

  const [subSubcategory, setSubSubcategory] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(""); // Local state for selected category

  // Filter subcategories that belong to the selected category
  const filteredSubcategories = selectedCategory
    ? subcategories.filter(
        (subcategory) => subcategory.parentCategory === selectedCategory
      )
    : subcategories;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", subSubcategory);
    formData.append("subcategoryId", subcategoryId);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:8050/api/v1/subcategory/sub/create",
        formData, // Pass the form data
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set correct headers
          },
        }
      );
      if (response.status === 201) {
        toast.success("Sub-subcategory created successfully!");
        setSubSubcategory("");
        setSubcategoryId("");
        setImage(null);
        setImagePreview(null); // Clear the image preview after success
      }
    } catch (error) {
      toast.error("Failed to create sub-subcategory");
      console.error(error);
    }
  };

  return (
    <>
      <Toaster  />
      <div className="mx-auto flex w-full max-w-lg flex-col rounded-xl border border-gray-300 bg-white p-6 shadow-lg">
        <h1 className="text-center font-bold text-3xl text-gray-800 mb-6">
          Create New Sub-Subcategory
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-field">
            <label
              htmlFor="sub-subcategory-name"
              className="form-label block text-lg font-medium text-gray-700 mb-2"
            >
              Sub-Subcategory Name
            </label>
            <input
              type="text"
              id="sub-subcategory-name"
              name="sub-subcategory"
              className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Sub-subcategory name"
              required
              value={subSubcategory}
              onChange={(e) => setSubSubcategory(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label
              htmlFor="category-select"
              className="form-label block text-lg font-medium text-gray-700 mb-2"
            >
              Select Category
            </label>
            <select
              id="category-select"
              className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)} // Update selected category
            >
              <option value="" disabled>
                -- Select a Category --
              </option>
              {categories.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label
              htmlFor="subcategory-select-2"
              className="form-label block text-lg font-medium text-gray-700 mb-2"
            >
              Select Subcategory
            </label>
            <select
              id="subcategory-select-2"
              className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={subcategoryId}
              onChange={(e) => setSubcategoryId(e.target.value)}
            >
              <option value="" disabled>
                -- Select a Subcategory --
              </option>
              {filteredSubcategories.map((subcategory, index) => (
                <option key={index} value={subcategory._id}>
                  {subcategory.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label
              htmlFor="image"
              className="form-label block text-lg font-medium text-gray-700 mb-2"
            >
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className="w-full p-2 border rounded-lg"
              required
              onChange={handleImageChange}
            />
          </div>

          {imagePreview && (
            <div className="form-field">
              <p className="text-lg font-medium text-gray-700 mb-2">
                Image Preview:
              </p>
              <img
                src={imagePreview}
                alt="Selected"
                className="w-full h-auto rounded-lg border mt-2"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-blue-600"
          >
            Create Sub-subcategory
          </button>
        </form>
      </div>
    </>
  );
}

export default NewSubsubcategory;
