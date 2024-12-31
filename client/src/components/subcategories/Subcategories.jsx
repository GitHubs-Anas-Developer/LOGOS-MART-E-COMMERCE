import React, { useContext, useEffect, useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import SubcategoryContext from "../../context/Subcategory";

function SubcategoriesCarousel() {
  const { fetchSubcategoriesAll, subcategoriesAll, loading, error } =
    useContext(SubcategoryContext);
  const carouselRef = useRef(null);

  useEffect(() => {
    fetchSubcategoriesAll();
  }, [fetchSubcategoriesAll]);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount =
        direction === "left"
          ? -carouselRef.current.offsetWidth / 2
          : carouselRef.current.offsetWidth / 2;
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="md:hidden text-center text-blue-500 text-lg py-10">
        Loading subcategories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="md:hidden text-center text-red-500 text-lg py-10">
        Failed to load subcategories. Please try again later.
      </div>
    );
  }

  return (
    <div className="md:hidden">
      <h1 className="text-2xl font-bold text-center text-white bg-gray-800 py-4 px-2 mb-1">
        Explore Popular Subcategories
      </h1>

      {/* Horizontal Scrolling Container */}
      <div className="relative">
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-10 hover:scale-110 transition"
          aria-label="Scroll left"
        >
          <AiOutlineLeft size={20} className="text-gray-700" />
        </button>

        {/* Scrollable Content */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scroll-smooth px-6 py-4 scrollbar-hide"
        >
          {subcategoriesAll.map((subcategory) => (
            <div
              key={subcategory.id}
              className="flex-shrink-0 w-28 bg-white rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105"
            >
              {/* Subcategory Image */}
              <div className="relative h-20">
                <img
                  src={subcategory.image || "/placeholder-image.png"}
                  alt={subcategory.title || "Subcategory"}
                  className="w-full h-full object-contain rounded-t-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg"></div>
              </div>

              {/* Subcategory Details */}
              <div className="p-1 text-center">
                <h2 className="text-sm font-semibold text-gray-800 truncate">
                  {subcategory.title || "Untitled"}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-10 hover:scale-110 transition"
          aria-label="Scroll right"
        >
          <AiOutlineRight size={20} className="text-gray-700" />
        </button>
      </div>
    </div>
  );
}

export default SubcategoriesCarousel;
