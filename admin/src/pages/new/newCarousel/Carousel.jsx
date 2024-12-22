import axios from "axios";
import React, { useState } from "react";

function Carousel() {
  const [images, setImages] = useState([]); // URLs for display
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageUpload = async (event) => {
    const files = event.target.files;

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("images", file));
    console.log("formData", formData);

    try {
      const response = await axios.post(
        "http://localhost:8050/api/v1/create/carouselBanner",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const uploadedImages = response.data.images; // Assuming response contains image URLs
      setImages((prevImages) => [...prevImages, ...uploadedImages]);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel-container flex flex-col items-center mx-auto border w-[460px] p-4 rounded-lg shadow-lg">
      <label
        htmlFor="upload"
        className="mb-3 text-xl font-semibold text-gray-700"
      >
        Carousel Banner
      </label>

      <input
        id="upload"
        type="file"
        multiple
        className="mb-4 cursor-pointer border border-gray-300 p-1 rounded-lg w-full text-gray-700"
        onChange={handleImageUpload}
      />

      {images.length > 0 && (
        <div className="relative w-full h-[300px] overflow-hidden rounded-lg shadow-lg">
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-600 bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 focus:outline-none"
            aria-label="Previous Slide"
          >
            &#10094;
          </button>

          <div className="image-wrapper transition-opacity duration-500 ease-in-out">
            <img
              src={images[currentIndex]}
              alt={`slide-${currentIndex}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-600 bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 focus:outline-none"
            aria-label="Next Slide"
          >
            &#10095;
          </button>

          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer transition ${
                  index === currentIndex
                    ? "bg-blue-500"
                    : "bg-gray-300 hover:bg-blue-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        className="bg-blue-700 text-white px-4 py-2 rounded-lg mt-3 hover:bg-blue-600 focus:outline-none"
      >
        Upload Images
      </button>
    </div>
  );
}

export default Carousel;
