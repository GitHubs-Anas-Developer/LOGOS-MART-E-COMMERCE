import { createContext, useState } from "react";
import api from "../utils/axiosInstance";
import { toast } from "react-hot-toast";

// Create the ProductReviews Context
export const ProductReviewsContext = createContext();

const ProductReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]); // Local state to store product reviews
  const [error, setError] = useState(null); // Error state for fetch operations
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const addProductReviews = async (productId, formData) => {
    console.log(productId, formData);

    try {
      const response = await api.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/product/reviews/${productId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        toast.success("Review added successfully!");
        await fetchProductReviews()
        return { success: true, message: response.data.message };
      
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to add review.";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // Fetch reviews for a specific product
  const fetchProductReviews = async (productId) => {
    setIsLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const response = await api.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/reviews/${productId}`
      );
      setReviews(response.data.reviews || []);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch product reviews.";
      toast.error(errorMessage);
      setError(errorMessage);
      setReviews([]); // Clear reviews on error
    } finally {
      setIsLoading(false);
    }
  };
  const handleLike = async (reviewId) => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/like/${reviewId}`
      );

      if (response.status === 200) {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review._id === reviewId
              ? { ...review, likes: review.likes + 1 }
              : review
          )
        );
        toast.success("Liked the review!");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to like the review.";
      toast.error(errorMessage);
    }
  };

  const handleDislike = async (reviewId) => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/dislike/${reviewId}`
      );

      if (response.status === 200) {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review._id === reviewId
              ? { ...review, dislikes: review.dislikes + 1 }
              : review
          )
        );
        toast.success("Disliked the review!");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to dislike the review.";
      toast.error(errorMessage);
    }
  };
  return (
    <ProductReviewsContext.Provider
      value={{
        reviews,
        addProductReviews,
        fetchProductReviews,
        handleLike,
        handleDislike,
        error,
        isLoading,
      }}
    >
      {children}
    </ProductReviewsContext.Provider>
  );
};

export default ProductReviewsProvider;
