import React, { useState, useEffect, useContext } from "react";
import ProductContext from "../../../context/Product";
import axios from "axios";

function NewProductImages() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [productId, setProductId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { fetchProducts, products } = useContext(ProductContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };

  const removeImage = (index) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, imgIndex) => imgIndex !== index)
    );
  };

  const handleUpload = async () => {
    if (!productId) {
      alert("Please select a product!");
      return;
    }

    const formData = new FormData();
    formData.append("productId", productId);
    selectedImages.forEach((image) => {
      formData.append("images", image);
    });

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8050/api/v1/product-images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload successful:", response.data);
      alert("Images uploaded successfully!");
      setSelectedImages([]);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-neutral-900">
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-center font-bold text-3xl text-gray-700 dark:text-white mb-8">
          Upload Product Images
        </h1>

        {/* Product Select Dropdown */}
        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Select Product
          </label>
          <select
            id="category"
            className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          >
            <option value="" disabled>
              -- Select a Product --
            </option>
            {products.map((product, index) => (
              <option key={index} value={product._id}>
                {product.title}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Image Previews */}
        {selectedImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {selectedImages.map((image, index) => (
              <div
                key={index}
                className="relative bg-gray-100 dark:bg-neutral-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
              >
                <img
                  src={image.preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload Button */}
        <div className="mt-6">
          <button
            onClick={handleUpload}
            disabled={isLoading}
            className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <div className="animate-spin border-t-4 border-blue-300 border-solid rounded-full w-6 h-6 mx-auto"></div>
            ) : (
              "Upload Images"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewProductImages;
