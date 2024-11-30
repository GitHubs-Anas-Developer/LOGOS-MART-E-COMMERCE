import React, { useContext, useState } from "react";
import { ProductReviewsContext } from "../../context/ProductReviews";

const AddReview = ({ productId }) => {
  const { addProductReviews } = useContext(ProductReviewsContext);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]); // Handle multiple images
  const [title, setTitle] = useState("");

  // Handle rating change
  const handleRatingChange = (value) => {
    setRating(value); // Set rating based on the selected value
  };

  // Handle comment change
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  // Handle file change for multiple image uploads
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to an array
    setImages((prevImages) => [...prevImages, ...files]); // Append new images to the existing list
  };

  // Remove selected image
  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index)); // Remove the image at the specific index
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create FormData to handle the images and other data
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("comment", comment);
    formData.append("title", title);
    formData.append("productId", productId);

    // Append each image to FormData
    images.forEach((image) => {
      formData.append("images", image); // Add all images under the 'images' field
    });

    console.log("Submitting formData:", formData);

    // Pass the formData to your addProductReviews function
    await addProductReviews(productId, formData); // Pass productId and formData correctly
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Add a Review
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Rating Selection with Star Rating */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                onClick={() => handleRatingChange(star)}
                xmlns="http://www.w3.org/2000/svg"
                fill={rating >= star ? "gold" : "gray"}
                className="w-6 h-6 cursor-pointer"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 17.75l-5.15 3.05 1.05-6.15-4.5-4.5 6.3-.45L12 2l2.3 5.75 6.3.45-4.5 4.5 1.05 6.15L12 17.75z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none text-gray-800"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a short title for your review"
            maxLength={100}
            required
          />
        </div>

        {/* Comment Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comment
          </label>
          <textarea
            className="w-full px-4 py-3 border rounded-lg focus:outline-none text-gray-800"
            value={comment}
            onChange={handleCommentChange}
            rows="4"
            placeholder="Write your review here..."
            required
          />
        </div>

        {/* Image Upload Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Images (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none text-gray-800"
          />
        </div>

        {/* Image Previews with Remove Button */}
        {images.length > 0 && (
          <div className="mb-6">
            <p className="text-sm text-gray-700 mb-2">Selected Images:</p>
            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="max-w-full h-auto object-cover rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button for Review */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
