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
import {
  FaWarehouse,
  FaUserAlt,
  FaRegHandshake,
  FaTools,
} from "react-icons/fa";

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
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
    fetchAddress();
  }, [productDetails._id, productDetails.subSubcategoryId]);

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
      <div className="flex justify-center items-center h-screen ">
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
  } else {
    console.log("Invalid about field format");
  }

  console.log("selectedImage", selectedImage);

  return (
    <>
      <CategoriesBanner />
      <div className="bg-gray-50 min-h-screen p-2">
        <div className="container mx-auto bg-white rounded-lg ">
          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left: Product Images */}
            <div className="md:col-span-4 flex flex-col items-center gap-4  p-2">
              {/* Main Image Section */}
              <div className="relative w-full h-96 flex justify-center items-center">
                <img
                  src={selectedImage == "" ? productImages[0] : selectedImage}
                  alt={productDetails.title}
                  className="w-full h-full object-contain rounded-lg  transition-transform duration-500 ease-in-out transform "
                />
              </div>

              {/* Thumbnail Gallery Section */}
              <div className="w-full flex gap-2 overflow-x-auto scrollbar-hide p-2">
                {productImages.map((image, index) => (
                  <div
                    key={index}
                    className={`relative h-16 w-16 flex-shrink-0 rounded-md border cursor-pointer transition-all duration-300 ease-in-out ${
                      selectedImage === image
                        ? "border-blue-500 bg-blue-50 shadow-sm scale-105"
                        : "border-gray-300 hover:border-blue-400"
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="md:col-span-7 border p-2 overflow-y-auto">
              <div className="border-b border-gray-300 pb-4 mb-5 ">
                <h1 className="text-2xl font-extrabold text-gray-900 leading-snug">
                  {productDetails.title}
                </h1>
              </div>

              <div className="flex items-center space-x-3">
                {/* Star Icon */}
                <FaStar className="text-green-500 text-lg" />

                {/* Rating and Reviews */}
                <div className="flex items-center text-lg font-medium text-gray-700">
                  {/* Rating */}
                  <span>{productDetails.rating}</span>

                  {/* Separator */}
                  <span className="mx-1 text-gray-500">|</span>

                  {/* Ratings Text */}
                  <span className="text-sm text-gray-500">Ratings</span>

                  {/* Reviews Count */}
                  <span className="ml-2 text-sm text-gray-500">
                    {productDetails.reviews.length} Reviews
                  </span>
                </div>
              </div>

              <div className="mt-6 w-full max-w-sm bg-gray-50  border-gray-300 rounded-lg p-5 shadow-sm">
                {/* Price Section */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-gray-800">
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
                  <div className="bg-green-500 text-white text-xs font-medium px-3 py-1 rounded">
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
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-lg font-medium text-gray-500 line-through">
                    {selectedVariant
                      ? formatPrice(selectedVariant.price)
                      : formatPrice(
                          productDetails.price ||
                            productDetails.variants[0]?.price ||
                            0
                        )}
                  </span>
                  <span className="text-sm text-gray-500">Original Price</span>
                </div>
              </div>

              {/* Color Options */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Choose Color
                </h3>
                <div className="flex gap-4 mt-3">
                  {productDetails.colors.map((color, index) => (
                    <button
                      key={color._id}
                      onClick={() => handleColorChange(index)}
                      className={` rounded-lg text-lg font-semibold transition-colors duration-300 ease-in-out ${
                        selectedColorIndex === index
                          ? "bg-blue-300 text-black border border-blue-200"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                      }`}
                      style={{
                        backgroundColor:
                          selectedColorIndex === index
                            ? color.hexCode
                            : "transparent",
                      }}
                      onClickCapture={() => setColorVariantId(color._id)}
                    >
                      <div className="flex flex-col items-center p-1 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
                        {/* Image Container */}
                        <div className="h-10 w-10 rounded-full border border-blue-400 overflow-hidden flex items-center justify-center bg-gray-50">
                          <img
                            src={color.images[0]}
                            alt={`${color.colorName} swatch`}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {/* Color Name */}
                        <span className="mt-1 text-gray-700 font-light text-xs">
                          {color.colorName}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {productDetails.variants[0].offerPrice === 0 ? (
                ""
              ) : (
                <div className="mt-4">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {productDetails.variants.map((variant, index) => (
                      <button
                        key={index}
                        value={index}
                        onClick={handleVariantChange}
                        className={`p-1 rounded-xl  border 
            flex flex-col items-center justify-center text-gray-700 font-medium 
       
  
            ${
              selectedVariant === index
                ? "bg-purple-500 text-white border-purple-500 shadow-md"
                : "bg-gray-50"
            }`}
                      >
                        {/* Variant Title */}
                        <span
                          className="text-sm font-semibold"
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
                </div>
              )}

              <div className="mt-4 bg-white p-4 rounded-lg border">
                {/* Product Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Stock Section */}
                  <div className="flex flex-col items-center justify-center border-b p-4">
                    <FaWarehouse className="text-2xl text-gray-800 mb-2" />
                    <p className="text-lg font-semibold text-gray-800">Stock</p>
                    <p
                      className={`text-sm font-medium ${
                        productDetails.stock > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {productDetails.stock > 0 ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>

                  {/* Seller Section */}
                  <div className="flex flex-col items-center justify-center border-b   p-4">
                    <FaUserAlt className="text-2xl text-gray-800 mb-2" />
                    <p className="text-lg font-semibold text-gray-800">
                      Seller
                    </p>
                    <p className="text-sm font-medium text-gray-600">
                      {productDetails.seller}
                    </p>
                  </div>

                  {/* Brand Section */}
                  <div className="flex flex-col items-center justify- border-b   p-4">
                    <FaRegHandshake className="text-2xl text-gray-800 mb-2" />
                    <p className="text-lg font-semibold text-gray-800">Brand</p>
                    <p className="text-sm font-medium text-gray-600">
                      {productDetails.brand}
                    </p>
                  </div>

                  {/* Warranty Section */}
                  <div className="flex flex-col items-center justify-center   p-4">
                    <FaTools className="text-2xl text-gray-800 mb-2" />
                    <p className="text-lg font-semibold text-gray-800">
                      Warranty
                    </p>
                    {/* <p className="text-sm font-medium text-gray-600">
                      {productDetails.warranty}
                    </p> */}
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm m-5">
                {/* Section Title */}
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Delivery Details
                </h2>

                {/* Estimated Delivery Time */}
                <div className="mb-4">
                  <p className="">
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
                <div className="mb-4">
                  <p className="">
                    Delivery cost:{" "}
                    <strong
                      className={`${
                        productDetails.delivery.cost === 0
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {productDetails.delivery.cost === null ||
                      productDetails.delivery.cost === 0
                        ? "Free"
                        : `${formatPrice(productDetails.delivery.cost)}`}
                    </strong>
                  </p>
                </div>

                {/* Delivery Information Link */}
                <div>
                  <p className="text-gray-600 ">
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

              <div className="bg-white  p-6 rounded-lg shadow-lg">
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
                            index % 2 === 0 ? "bg-gray-50 " : "bg-white "
                          } hover:bg-yellow-50 dark:hover:bg-yellow-700 transition duration-300`}
                        >
                          {/* Key */}
                          <td className="py-3 px-4  dark:text-gray-300 font-medium uppercase border-b">
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
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold py-3 rounded-md shadow-md transition-transform duration-300"
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
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-3 rounded-md shadow-md  transition-transform duration-300"
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

          <ProductImages productId={productDetails._id} />
          {/* Related Products Section */}
          <div className="space-y-4 border ">
            <RelatedProductsData />
          </div>

          {/* Product Reviews Section */}
          <div className="space-y-4 border ">
            <ProductReviews />
          </div>

          {/* Add Review Section */}
          {/* <div className="space-y-4 border">
            <AddReview productId={productDetails._id} />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
