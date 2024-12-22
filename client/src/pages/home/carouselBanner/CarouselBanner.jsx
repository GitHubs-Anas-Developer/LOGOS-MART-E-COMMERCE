import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import api from "./../../../utils/axiosInstance"; // Ensure this is your API utility file

function CarouselBanner() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch carousel banners
  const fetchCarouselBanner = async () => {
    try {
      const response = await api.get("/api/v1/carouselBanners");
      setImages(response.data.banners); // Assuming `banners` is an array of objects with `src` and `alt`
    } catch (err) {
      console.error("Error fetching carousel banners:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarouselBanner();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
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
            <img src={image.images[0]} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselBanner;
