import React, { useContext, useEffect } from "react";
import CategoryContext from "../../context/Category";

function Categories() {
  const { fetchCategory, categories, loading, error } =
    useContext(CategoryContext);

  // Fetch categories when the component is mounted
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    fetchCategory();
  }, []);

  console.log("categories", categories);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 text-lg">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="categories-container ">
      <h1 className="text-2xl font-bold text-center text-white bg-gray-800 py-4 px-2  mb-1">
        Explore Popular Categories
      </h1>
      <div
        className="flex overflow-x-auto space-x-6 py-4 scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {categories?.map((category) => (
          <div
            key={category.id}
            className="category-card bg-white shadow-lg rounded-xl overflow-hidden w-60 flex-none transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-36 object-contain rounded-t-xl"
            />
            <h3 className="text-lg font-semibold text-center py-4 px-2 text-gray-800">
              {category.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
