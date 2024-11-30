import React, { useContext, useEffect } from "react";
import { ProductReviewsContext } from "../../context/ProductReviews";

function ProductReviews({ productId }) {
  const {
    reviews,
    fetchProductReviews,
    handleLike,
    handleDislike,
    isLoading,
    error,
  } = useContext(ProductReviewsContext);

  // Fetch reviews on component mount or when the productId changes
  useEffect(() => {
    if (productId) {
      fetchProductReviews(productId);
    }
  }, [productId, fetchProductReviews, reviews]);

  // Display loading state
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <p className="text-gray-600 text-center">Loading reviews...</p>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <p className="text-red-600 text-center">
          Failed to load reviews: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Customer Reviews
      </h2>

      {reviews?.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-sm bg-gray-50"
            >
              {/* User Name */}
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-lg font-medium text-blue-600">
                  {review.user?.userName || "Anonymous User"}
                </h3>
                <span className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-md font-medium text-gray-700 mb-2">
                {review.title || "No Title Provided"}
              </h4>

              {/* Comment */}
              <p className="text-gray-700 mb-4">{review.comment}</p>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={i < review.rating ? "gold" : "gray"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M12 17.75l-5.15 3.05 1.05-6.15-4.5-4.5 6.3-.45L12 2l2.3 5.75 6.3.45-4.5 4.5 1.05 6.15L12 17.75z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600 text-sm">
                  {review.rating} / 5
                </span>
              </div>

              {/* Images - Horizontal Layout */}
              {review.images && review.images.length > 0 && (
                <div className="mt-4 flex flex-nowrap gap-4 overflow-x-auto">
                  {review.images.map((image, idx) => (
                    <img
                      key={idx}
                      src={image} // Assuming `image` is a URL
                      alt={`Review ${index + 1} - Image ${idx + 1}`}
                      onError={(e) => (e.target.src = "/fallback.jpg")} // Fallback image
                      className="w-48 h-32 object-contain rounded-lg shadow-md transition-transform hover:scale-105"
                    />
                  ))}
                </div>
              )}

              {/* Like / Dislike Buttons */}
              <div className="mt-4 flex items-center space-x-4">
                <button
                  onClick={() => handleLike(review._id)}
                  disabled={isLoading}
                  className={`text-blue-500 font-semibold hover:text-blue-600`}
                >
                  👍 Like ({review.likes})
                </button>
                <button
                  onClick={() => handleDislike(review._id)}
                  disabled={isLoading}
                  className={`text-red-500 font-semibold hover:text-red-600`}
                >
                  👎 Dislike ({review.dislikes})
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">
          No reviews available for this product.
        </p>
      )}
    </div>
  );
}

export default ProductReviews;
