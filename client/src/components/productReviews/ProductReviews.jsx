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

  // Fetch reviews when productId changes
  useEffect(() => {
    if (productId) {
      fetchProductReviews(productId);
    }
  }, [productId, fetchProductReviews]);

  // Loading State
  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto py-10">
        <p className="text-center text-indigo-500 font-medium animate-pulse">
          Loading reviews...
        </p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="max-w-5xl mx-auto py-10">
        <p className="text-center text-red-600 font-bold">
          Failed to load reviews: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Customer Reviews
      </h2>

      {reviews?.length > 0 ? (
        <div className="relative border-l border-gray-300">
          {reviews.map((review, index) => (
            <div key={index} className="mb-10 ml-6">
              {/* Timeline Dot */}
              <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-1.5 top-4"></div>

              {/* Review Card */}
              <div className="p-6 bg-white shadow-md rounded-lg border border-gray-200">
                {/* User Information */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-10 h-10 bg-indigo-500 text-white flex items-center justify-center rounded-full font-semibold uppercase">
                    {review.user?.userName?.charAt(0) || "A"}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {review.user?.userName || "Anonymous"}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Review Content */}
                <h4 className="text-md font-semibold text-gray-700 mb-2">
                  {review.title || "No Title Provided"}
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  {review.comment}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={i < review.rating ? "gold" : "gray"}
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                    >
                      <path d="M12 17.75l-5.15 3.05 1.05-6.15-4.5-4.5 6.3-.45L12 2l2.3 5.75 6.3.45-4.5 4.5 1.05 6.15L12 17.75z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    {review.rating} / 5
                  </span>
                </div>

                {/* Images */}
                {review.images && review.images.length > 0 && (
                  <div className="mt-4 flex gap-4 overflow-x-auto">
                    {review.images.map((image, idx) => (
                      <img
                        key={idx}
                        src={image}
                        alt={`Review ${index + 1} - Image ${idx + 1}`}
                        onError={(e) => (e.target.src = "/fallback.jpg")}
                        className="w-24 h-24 object-cover rounded-lg border shadow-sm"
                      />
                    ))}
                  </div>
                )}

                {/* Like / Dislike Buttons */}
                <div className="mt-4 flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(review._id)}
                    className="text-indigo-500 font-medium hover:text-indigo-600 flex items-center"
                  >
                    👍 Like <span className="ml-1">({review.likes})</span>
                  </button>
                  <button
                    onClick={() => handleDislike(review._id)}
                    className="text-red-500 font-medium hover:text-red-600 flex items-center"
                  >
                    👎 Dislike <span className="ml-1">({review.dislikes})</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No reviews available for this product.
        </p>
      )}
    </div>
  );
}

export default ProductReviews;
