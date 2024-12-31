import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductsContext from "../../context/Products";
import CartContext from "../../context/Cart";
import AddressContext from "../../context/Address";
import RelatedProductsData from "../../components/relatedProducts/RelatedProductsData";
import AddReview from "../../components/productReviews/AddReview";
import ProductReviews from "../../components/productReviews/ProductReviews";
import { FaStar } from "react-icons/fa";
import { ProductReviewsContext } from "../../context/ProductReviews";
import RelatedProducts from "../../context/RelatedProducts";
import { ProductImagesContext } from "../../context/productImages";
import ProductImages from "../../components/productDetailsImages/ProductImages";
import CategoriesBanner from "../home/categoryBanner/CategoriesBanner";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    fetchSingleProductDetails,
    productDetails,
    loadingProductDetails,
    error,
  } = useContext(ProductsContext);
  const { addToCart } = useContext(CartContext);
  const { fetchAddress, address } = useContext(AddressContext);
  const { fetchRelatedProducts } = useContext(RelatedProducts);
  const { fetchProductReviews } = useContext(ProductReviewsContext);
  const { fetchProductImages } = useContext(ProductImagesContext);

  const [selectedVariant, setSelectedVariant] = useState(null);
  const handleVariantChange = (event) => {
    setSelectedVariant(productDetails.variants[event.target.value]);
  };

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState("");

  const [selectRamStorageVariantId, setSelectRamStorageVariantId] =
    useState("");
  const [selectColorVariantId, setColorVariantId] = useState("");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    fetchSingleProductDetails(id);

    fetchRelatedProducts(productDetails.subSubcategoryId);
    fetchProductReviews(id);
    fetchProductImages(id);

    fetchAddress();
  }, [id, productDetails.subSubcategoryId]);

  const handleColorChange = (index) => setSelectedColorIndex(index);
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);

  const addtoCart = (e, productId) => {
    e.preventDefault();
    addToCart(productId);
  };

  const buyHandler = () => {
    if (address.length > 0) {
      navigate("/payment", {
        state: {
          productId: productDetails._id,
          productColorId: selectColorVariantId,
          productRamStorageId: selectRamStorageVariantId,
        },
      });
    } else {
      navigate("/shippingAddress", {
        state: {
          product: productDetails,
        },
      });
    }
  };

  if (loadingProductDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  if (!productDetails || !productDetails.colors?.length) {
    return (
      <p className="text-center text-gray-500">No product details available.</p>
    );
  }

  const productImages = productDetails.colors[selectedColorIndex]?.images || [];

  if (
    Array.isArray(productDetails.about) &&
    typeof productDetails.about[0] === "string"
  ) {
    var productAbout = productDetails.about[0].split(",");
    console.log("productAbout:", productAbout);
  } else {
    console.log("Invalid about field format");
  }

  return (
    <>
      <CategoriesBanner />
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto bg-white rounded-lg shadow-lg p-6">
          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left: Product Images */}
            <div className="md:col-span-5">
              <div className="relative">
                <img
                  src={selectedImage || productDetails.cardImage}
                  alt={productDetails.title}
                  className="w-full h-96 object-contain rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
              </div>
              <div className="mt-4 flex gap-4 overflow-x-auto scrollbar-hide">
                {productImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index + 1}`}
                    className={`h-20 w-20 rounded-lg border-2 p-1 cursor-pointer transition-all duration-300 ease-in-out ${
                      selectedImage === image
                        ? "border-blue-500 scale-105"
                        : "border-gray-300 hover:border-blue-400"
                    }`}
                    onClick={() => setSelectedImage(image)}
                  />
                ))}
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="md:col-span-7">
              <div className="border-b border-gray-300 pb-4 mb-5">
                <h1 className="text-2xl font-extrabold text-gray-900 leading-snug">
                  {productDetails.title}
                </h1>
              </div>

              <div className="flex items-center space-x-2">
                <FaStar className="text-yellow-500 text-lg" />
                <span className="text-gray-700 text-lg font-medium">
                  {productDetails.rating}{" "}
                  <span className="text-gray-500 text-sm">/ 5</span>
                </span>
              </div>

              <div className="mt-6 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md p-6">
                {/* Price Section */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col">
                    <span className="block text-3xl font-bold text-gray-800">
                      {selectedVariant
                        ? formatPrice(selectedVariant.offerPrice)
                        : formatPrice(
                            productDetails.offerPrice ||
                              productDetails.variants[0]?.offerPrice ||
                              0
                          )}
                    </span>
                  </div>

                  {/* Discount Badge */}
                  <div className="bg-yellow-400 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md">
                    {selectedVariant
                      ? `${selectedVariant.discountPercentage}% OFF`
                      : `${
                          productDetails.discountPercentage ||
                          productDetails.variants[0]?.discountPercentage ||
                          0
                        }% OFF`}
                  </div>
                </div>

                {/* Original Price */}
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-xl font-medium text-gray-400 line-through">
                    {selectedVariant
                      ? formatPrice(selectedVariant.price)
                      : formatPrice(
                          productDetails.price ||
                            productDetails.variants[0]?.price ||
                            0
                        )}
                  </span>
                  <span className="text-sm text-gray-600">Original Price</span>
                </div>
              </div>

              <div className="mt-1 bg-gray-50 p-6 rounded-lg ">
                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                  {/* Stock */}
                  <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 text-green-600 flex items-center justify-center rounded-md">
                        {/* Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16 5H4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2zM4 13V7h12v6H4z" />
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-600 font-medium">Stock</p>
                    </div>
                    <p
                      className={`text-sm font-semibold ${
                        productDetails.stock > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {productDetails.stock > 0 ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>

                  {/* Seller */}
                  <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-md">
                        {/* Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 2a4 4 0 00-4 4v2a4 4 0 004 4 4 4 0 004-4V6a4 4 0 00-4-4zM5 8V6a5 5 0 0110 0v2a5 5 0 01-10 0v-2zm5 6a6 6 0 00-5.917 5H5a1 1 0 000-2h10a1 1 0 000 2h.917A6 6 0 0010 14z" />
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-600 font-medium">Seller</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">
                      {productDetails.seller}
                    </p>
                  </div>

                  {/* Brand */}
                  <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-yellow-100 text-yellow-600 flex items-center justify-center rounded-md">
                        {/* Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 2a4 4 0 00-4 4v2a4 4 0 004 4 4 4 0 004-4V6a4 4 0 00-4-4zm-5 8a5 5 0 0110 0v2a5 5 0 01-10 0v-2zm-2 4a1 1 0 000 2h14a1 1 0 000-2H3z" />
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-600 font-medium">Brand</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">
                      {productDetails.brand}
                    </p>
                  </div>

                  {/* Warranty */}
                  <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-100 text-purple-600 flex items-center justify-center rounded-md">
                        {/* Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 5a3 3 0 013-3h10a3 3 0 013 3v10a3 3 0 01-3 3H5a3 3 0 01-3-3V5zm5 0a1 1 0 100 2h6a1 1 0 100-2H7z" />
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-600 font-medium">
                        Warranty{" "}
                      </p>
                      {""}
                    </div>
                    <p className="text-sm font-semibold text-gray-800 ml-2">
                      {productDetails.warranty}
                    </p>
                  </div>
                </div>
              </div>

              {/* Color Options */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-black">
                  Choose Color
                </h3>
                <div className="flex gap-4 mt-3">
                  {productDetails.colors.map((color, index) => (
                    <button
                      key={color._id}
                      onClick={() => handleColorChange(index)}
                      className={`py-2 px-4 border rounded-lg text-black ${
                        selectedColorIndex === index
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                      onClickCapture={() => setColorVariantId(color._id)}
                    >
                      {color.colorName}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                {productDetails.variants &&
                productDetails.variants.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {productDetails.variants.map((variant, index) => (
                      <button
                        key={index}
                        value={index}
                        onClick={handleVariantChange}
                        className={`p-4 rounded-xl shadow-sm border transition-all duration-300
            flex flex-col items-center justify-center text-gray-700 font-medium 
            hover:shadow-md hover:border-purple-500 hover:text-purple-500
            focus:outline-none focus:ring-2 focus:ring-purple-500 
            ${
              selectedVariant === index
                ? "bg-purple-500 text-white border-purple-500 shadow-md"
                : "bg-gray-50"
            }`}
                      >
                        {/* Variant Title */}
                        <span
                          className="text-lg font-semibold"
                          onClick={() =>
                            setSelectRamStorageVariantId(variant._id)
                          }
                        >
                          {variant.ram} + {variant.storage}
                        </span>

                        {/* Variant Price (if available) */}
                        {variant.price && (
                          <span
                            className={`mt-1 text-sm ${
                              selectedVariant === index
                                ? "text-white"
                                : "text-gray-500"
                            }`}
                          >
                            Best Price: {formatPrice(variant.offerPrice)}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center">
                    No variants available
                  </p>
                )}
              </div>

              <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md m-5">
                {/* Section Title */}
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Delivery Details
                </h2>

                {/* Estimated Delivery Time */}
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-full mr-3">
                    {/* Calendar Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M6 2a1 1 0 100 2h8a1 1 0 100-2H6zM4 5a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2H4zM2 9h16v8H2V9z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Estimated delivery time:{" "}
                    <strong className="text-green-600">
                      {new Date(
                        new Date().setDate(
                          new Date().getDate() +
                            productDetails.delivery.estimatedDays
                        )
                      ).toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </strong>
                  </p>
                </div>

                {/* Delivery Cost */}
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-3">
                    {/* Dollar Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 2a8 8 0 110 16A8 8 0 0110 2zm0 12a4 4 0 100-8 4 4 0 000 8z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Delivery cost:{" "}
                    <strong
                      className={`${
                        productDetails.delivery.cost === 0
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {productDetails.delivery.cost === 0
                        ? "Free"
                        : `$${productDetails.delivery.cost}`}
                    </strong>
                  </p>
                </div>

                {/* Delivery Information Link */}
                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-full mr-3">
                    {/* Info Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 2a8 8 0 110 16A8 8 0 0110 2zm0 11a1 1 0 100 2 1 1 0 000-2zm-1-6a1 1 0 012 0v4a1 1 0 01-2 0V7z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    For more details, visit our{" "}
                    <a
                      href="/delivery-info"
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Delivery Information
                    </a>{" "}
                    page.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                {/* Section Title */}
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Highlights
                </h1>

                {/* Highlights Table */}
                <table className="w-full text-left border-collapse">
                  <tbody>
                    {Object.entries(productDetails.highlights[0]).map(
                      ([key, value], index) => (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 0
                              ? "bg-gray-50 dark:bg-gray-700"
                              : "bg-white dark:bg-gray-800"
                          } hover:bg-yellow-50 dark:hover:bg-yellow-700 transition duration-300`}
                        >
                          {/* Key */}
                          <td className="py-3 px-4 text-gray-700 dark:text-gray-300 font-medium uppercase border-b">
                            {key.replace(/_/g, " ")}
                          </td>
                          {/* Value */}
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400 border-b">
                            {typeof value === "object" ? (
                              <ul className="list-disc list-inside">
                                {Object.entries(value).map(
                                  ([nestedKey, nestedValue], subIndex) => (
                                    <li key={subIndex}>
                                      <span className="font-medium text-gray-700 dark:text-gray-300">
                                        {nestedKey.replace(/_/g, " ")}:
                                      </span>{" "}
                                      {nestedValue}
                                    </li>
                                  )
                                )}
                              </ul>
                            ) : (
                              <span>{value}</span>
                            )}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                {/* Add to Cart */}
                <button
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold py-3 rounded-md shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
                  onClick={(e) => addtoCart(e, productDetails._id)}
                >
                  {/* Shopping Cart Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M6 2a1 1 0 000 2h1.22l.349 1.286A1 1 0 008.547 6h7.576l-.39 2H8.22a1 1 0 100 2h7.769l-.369 2H9.549a1 1 0 100 2h6.74l-.447 2.35A2 2 0 0114 18H6a1 1 0 100 2h8a4 4 0 003.891-3.05l1.61-8.437A1 1 0 0018 6H8.618l-.359-1.313A1 1 0 007.268 4H6z" />
                  </svg>
                  Add to Cart
                </button>

                {/* Buy Now */}
                <button
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-3 rounded-md shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
                  onClick={buyHandler}
                >
                  {/* Lightning Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M11 0L3 10h6v10l8-10h-6V0z" />
                  </svg>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-black mb-3 font-bold text-2xl mt-5">
              About this item
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              {productAbout && productAbout.length > 0
                ? productAbout.map((about, index) => (
                    <li
                      key={index}
                      className="text-gray-800 text-base hover:text-purple-600 transition-colors duration-300"
                    >
                      {about}
                    </li>
                  ))
                : ""}
            </ul>
          </div>

          <div className="description-container p-4 rounded bg-white shadow-sm">
            <h2 className="text-black mb-3 font-bold">
              {productDetails.description ? <span>Description</span> : ""}
            </h2>
            <p className="text-black">
              {productDetails.description ? productDetails.description : ""}
            </p>
          </div>

          {/* Specifications */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">
              Specifications
            </h2>
            <div className="overflow-x-auto shadow-sm rounded-md">
              <table className="w-full table-auto border-collapse bg-white">
                {/* Table Header */}
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="py-3 px-6 text-gray-800 font-semibold uppercase">
                      Key
                    </th>
                    <th className="py-3 px-6 text-gray-800 font-semibold uppercase">
                      Value
                    </th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                  {Object.entries(productDetails.specifications[0]).map(
                    ([key, value], index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-yellow-50 transition-all duration-300`}
                      >
                        {/* Key */}
                        <td className="py-3 px-6 text-gray-700 font-medium">
                          {key}
                        </td>
                        {/* Value */}
                        <td className="py-3 px-6 text-gray-600">
                          {typeof value === "object" ? (
                            <ul className="list-disc list-inside">
                              {Object.entries(value).map(
                                ([subKey, subValue], subIndex) => (
                                  <li key={subIndex}>
                                    <span className="font-medium">
                                      {subKey}:
                                    </span>{" "}
                                    {subValue}
                                  </li>
                                )
                              )}
                            </ul>
                          ) : (
                            value
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <ProductImages />
          {/* Related Products and Reviews */}
          <RelatedProductsData />
          <ProductReviews />
          <AddReview productId={productDetails._id} />
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
