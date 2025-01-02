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
        {/* Scrollable Content */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto scroll-smooth  scrollbar-hide"
        >
          {subcategoriesAll.map((subcategory) => (
            <div
              key={subcategory.id}
              className="flex-shrink-0 w-28 bg-white "
            >
              {/* Subcategory Image */}
              <div className="relative h-20">
                <img
                  src={subcategory.image || "/placeholder-image.png"}
                  alt={subcategory.title || "Subcategory"}
                  className="w-full h-full object-contain "
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
      </div>
    </div>
  );
}

export default SubcategoriesCarousel;
