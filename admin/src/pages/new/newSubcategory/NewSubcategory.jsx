import React, { useContext, useEffect, useState } from "react";
import CategoryContext from "../../../context/Category";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

function NewSubcategory() {
  const { categories, fetchCategories } = useContext(CategoryContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  const [subcategory, setSubcategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // Create a preview URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("subcategory", subcategory);
    formData.append("categoryId", categoryId);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:8050/api/v1/subcategory/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Subcategory created successfully!");
        setSubcategory("");
        setCategoryId("");
        setImage(null);
        setImagePreview(null); // Clear the image preview
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the subcategory.");
    }
  };

  return (
    <>
      <Toaster />
      <div className="mx-auto flex w-full max-w-lg flex-col rounded-xl border border-gray-300 bg-white p-6 shadow-lg">
        <h1 className="text-center font-bold text-3xl text-gray-800 mb-6">
          Create New Subcategory
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-field">
            <label htmlFor="subcategory" className="form-label block text-lg font-medium text-gray-700 mb-2">
              Subcategory Name
            </label>
            <input
              type="text"
              id="subcategory"
              className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              placeholder="Enter subcategory name"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="category" className="form-label block text-lg font-medium text-gray-700 mb-2">
              Select Category
            </label>
            <select
              id="category"
              className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="" disabled>
                -- Select a category --
              </option>
              {categories.map((categoryItem, index) => (
                <option key={index} value={categoryItem._id}>
                  {categoryItem.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="image" className="form-label block text-lg font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              className="w-full p-2 border rounded-lg"
              onChange={handleImageChange}
              required
            />
          </div>

          {imagePreview && (
            <div className="form-field">
              <p className="text-lg font-medium text-gray-700 mb-2">Image Preview:</p>
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
            Create Subcategory
          </button>
        </form>
      </div>
    </>
  );
}

export default NewSubcategory;
