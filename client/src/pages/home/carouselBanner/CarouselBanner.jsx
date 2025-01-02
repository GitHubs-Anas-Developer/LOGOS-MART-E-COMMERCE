import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import api from "./../../../utils/axiosInstance"; // Ensure this is your API utility file

function CarouselBanner() {
  const [images, setImages] = useState([]); // Initialize images as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch carousel banners
  const fetchCarouselBanner = async () => {
    try {
      const response = await api.get("/api/v1/carouselBanners");
      setImages(response.data.banners.images); // Ensure this is an array of images
    } catch (err) {
      console.error("Error fetching carousel banners:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  console.log("images", images);

  useEffect(() => {
    fetchCarouselBanner();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error || !images.length) {
    return (
      <div className="text-center text-red-600">
        Failed to load banners. Please try again later.
      </div>
    );
  }

  return (
    <div className="carousel-container">
      <Carousel
        autoPlay
        infiniteLoop
        showArrows
        showThumbs={false}
        interval={3000}
        dynamicHeight={false}
        stopOnHover
      >
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={image.alt} className="h-auto" />{" "}
            {/* Ensure `src` and `alt` exist */}
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselBanner;
