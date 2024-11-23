import axios from "axios";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

function NewCategory() {
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // Create a preview URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();
    formData.append("title", category); // Append the category title
    formData.append("image", image); // Append the image file

    try {
      const response = await axios.post(
        "http://localhost:8050/api/v1/createcategory",
        formData, // Send the FormData instance
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type
          },
        }
      );

      if (response.status === 201) {
        toast.success("Category created successfully!"); // Reset the form fields
        setCategory("");
        setImage(null);
        setImagePreview(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the category.");
    }
  };

  return (
    <>
      <Toaster />
      <div className="mx-auto flex w-full max-w-lg flex-col rounded-xl border border-gray-300 bg-white p-6 shadow-lg">
        <h1 className="text-center font-bold text-3xl text-gray-800 mb-6">
          Create New Category
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-field">
            <label htmlFor="category" className="form-label block text-lg font-medium text-gray-700 mb-2">
              Category:
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter category name"
              className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="image" className="form-label block text-lg font-medium text-gray-700 mb-2">
              Image:
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*" // Accept only image files
              onChange={handleImageChange}
              className="w-full p-2 border rounded-lg"
              required
            />
            {imagePreview && (
              <div className="mt-4 flex justify-center">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="rounded-lg border w-full max-w-xs h-auto"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-green-600"
          >
            Submit Now
          </button>
        </form>
      </div>
    </>
  );
}

export default NewCategory;
