import React, { useContext, useEffect } from "react";
import { ProductReviewsContext } from "../../context/ProductReviews";
import { IoStarOutline } from "react-icons/io5";
import { SlDislike, SlLike } from "react-icons/sl";
import { Link } from "react-router-dom";

function ProductReviews({ productId }) {
  const {
    reviews,
    ratingLength,
    reviewlength,
    overAllRating,
    ratingDistribution,
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
    <div className=" mx-auto border  ">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-2   p-3">
        Customer Reviews
      </h2>

      <div className="text-center p-3 border">
        <h3 className="text-3xl font-semibold text-indigo-600 mb-2">
          Overall Rating:{" "}
          <span className="text-4xl font-extrabold">{overAllRating}</span>
        </h3>
        <p className="text-gray-600">
          ({ratingLength}) Ratings & Reviews ({reviewlength})
        </p>
        <div className="mt-4">
          {Object.entries(ratingDistribution).map(([range, count]) => {
            // Determine the color based on the rating range
            let barColor = "bg-gray-200"; // Default gray color for the background
            if (range === "5" || range === "4") {
              barColor = "bg-green-500"; // High ratings in green
            } else if (range === "3") {
              barColor = "bg-orange-400"; // Mid-range ratings in orange
            } else if (range === "2" || range === "1") {
              barColor = "bg-red-500"; // Low ratings in red
            }

            return (
              <div
                key={range}
                className="flex items-center justify-center mb-4"
              >
                <span
                  className={`text-sm font-semibold ${
                    range >= 4
                      ? "text-green-600"
                      : range === 3
                      ? "text-orange-400"
                      : "text-red-600"
                  }`}
                >
                  {range} Star{range > 1 ? "s" : ""}
                </span>

                <div className="flex items-center w-2/3 bg-gray-200 rounded-full h-3 mx-2">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${barColor}`}
                    style={{
                      width: `${(count / ratingLength) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 font-semibold">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {reviews?.length > 0 ? (
        <div className="relative border">
          {reviews.map((review, index) => (
            <div key={index} className=" ">
              {/* Timeline Dot */}
              <div className="absolute w-3 h-3  rounded-full -left-1.5 top-4"></div>

              {/* Review Card */}
              <div className="p-6  border border-gray-200  transition-all duration-300">
                {/* User Information */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-indigo-500 text-white flex items-center justify-center rounded-full font-semibold uppercase">
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
                <p className="text-sm text-gray-600 mb-4">{review.comment}</p>

                {/* Rating */}
                <div className="flex items-center  w-fit p-1 bg-green-500 rounded-md ">
                  <span className="text-sm font-bold text-white flex items-center">
                    {review.rating}
                    <IoStarOutline className="ml-1 text-white" size={15} />
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
                    className="text-indigo-500 font-medium hover:text-indigo-600 flex items-center transition-all duration-200"
                  >
                    <SlLike />
                    <span className="ml-1">({review.likes})</span>
                  </button>
                  <button
                    onClick={() => handleDislike(review._id)}
                    className="text-red-500 font-medium hover:text-red-600 flex items-center transition-all duration-200"
                  >
                    <SlDislike />
                    <span className="ml-1">({review.dislikes})</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No reviews yet.</p>
      )}

      <div className="border shadow-md bg-white p-4 flex justify-end">
        <Link
          to="/reviews"
          className="text-blue-500 hover:text-blue-700 font-semibold underline transition duration-200"
        >
          View All {reviewlength} Reviews
        </Link>
      </div>
    </div>
  );
}

export default ProductReviews;
