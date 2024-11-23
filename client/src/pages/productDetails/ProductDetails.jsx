import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductsContext from "../../context/Products";
import { FaStar } from "react-icons/fa";
import CartContext from "../../context/Cart";
import AddressContext from "../../context/Address";
import { useNavigate } from "react-router-dom";
import Payment from "../payment/Payment";

function ProductDetails() {
  const { id } = useParams();
  const { fetchSingleProductDetails, productDetails, loading, error } =
    useContext(ProductsContext);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectImages, setSelectImages] = useState("");
  const { addToCart } = useContext(CartContext);
  const { fetchAddress, address } = useContext(AddressContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchSingleProductDetails(id);
    }
    fetchAddress();
  }, [id]);

  // Handle loading state
  if (loading) {
    return <p>Loading product details...</p>;
  }

  // Handle error state
  if (error) {
    return (
      <p className="text-red-500">
        Error loading product details: {error.message}
      </p>
    );
  }

  // Check if productDetails exists and colors are defined
  if (
    !productDetails ||
    !productDetails.colors ||
    productDetails.colors.length === 0
  ) {
    return <p>No product details available.</p>;
  }

  const handleColorChange = (index) => {
    setSelectedColorIndex(index);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const addtoCart = (e, productId) => {
    e.preventDefault();
    addToCart(productId); // assuming quantity 1 for simplicity
  };

  const buyHandler = () => {
    if (address.length > 0) {
      navigate("/payment", { state: { product: productDetails } });
    } else {
      navigate("/shippingAddress", { state: { product: productDetails } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="container mx-auto p-8 bg-white rounded-xl shadow-2xl">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Image Section */}
          <div className="md:col-span-5">
            {selectImages ? (
              <img
                src={selectImages}
                alt={productDetails.title}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            ) : (
              <img
                src={productDetails.colors[selectedColorIndex].images[0]}
                alt={productDetails.title}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            )}
            {/* Display selected color images */}
            <div className="mt-4 grid grid-cols-3 gap-4">
              {productDetails.colors[selectedColorIndex].images.map(
                (image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`${
                      productDetails.colors[selectedColorIndex].colorName
                    } - ${imgIndex + 1}`}
                    className="w-full h-auto object-contain rounded-lg shadow-md"
                    onClick={() => setSelectImages(image)}
                  />
                )
              )}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="md:col-span-7 space-y-6">
            {/* Product Title */}
            <h1 className="text-3xl font-extrabold text-gray-900">
              {productDetails.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-2 text-yellow-400">
              <FaStar className="text-yellow-500" />
              <span className="text-gray-600 text-sm">
                {productDetails.rating} / 5
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-6 text-gray-700">
              <span className="text-3xl font-semibold text-green-600">
                {formatPrice(productDetails.offerPrice)}
              </span>
              {productDetails.discountPercentage > 0 && (
                <>
                  <span className="text-lg font-medium line-through text-gray-400">
                    {formatPrice(productDetails.price)}
                  </span>
                  <span className="text-base font-medium text-red-500">
                    {productDetails.discountPercentage}% off
                  </span>
                </>
              )}
            </div>

            {/* Highlights */}
            <ul className="mt-6 space-y-4 text-gray-700">
              <li>
                <strong className="font-medium">Storage:</strong>{" "}
                {productDetails.storageSize}GB
              </li>
              <li>
                <strong className="font-medium">Seller:</strong>{" "}
                {productDetails.seller}
              </li>
              <li>
                <strong className="font-medium">Brand:</strong>{" "}
                {productDetails.brand}
              </li>
              <li>
                <strong className="font-medium">Warranty:</strong>{" "}
                {productDetails.warranty}
              </li>
              <li>
                <strong className="font-medium">Stock:</strong>{" "}
                {productDetails.stock > 0 ? "In stock" : "Out of stock"}
              </li>
            </ul>
            {/* Delivery Information */}
            <div className="mt-6 text-gray-700">
              <h3 className="text-xl font-semibold">Delivery Information</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <strong>Estimated Delivery Time:</strong>{" "}
                  {productDetails.delivery.estimatedDays} days
                </li>
                <li>
                  <strong>Delivery Cost:</strong>{" "}
                  {formatPrice(productDetails.delivery.cost)}
                </li>
              </ul>
            </div>

            {/* Color Selection */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-5">
                Choose Color
              </h2>
              <div className="flex space-x-4">
                {productDetails.colors.map((color, index) => (
                  <div>
                    <button
                      key={color._id}
                      onClick={() => handleColorChange(index)}
                      className={`border-2 p-2 flex items-center justify-center transition duration-300 text-black rounded-lg ${
                        selectedColorIndex === index
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      <span className=" text-black">{color.colorName}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add to Cart & Buy Now Buttons */}
            <div className="mt-8 flex space-x-6">
              <button
                className="w-full md:w-auto bg-teal-500 text-white py-3 px-8 rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
                onClick={(e) => {
                  addtoCart(e, productDetails._id);
                }}
              >
                Add to Cart
              </button>

              <button
                className="w-full md:w-auto bg-pink-500 text-white py-3 px-8 rounded-lg shadow-md hover:bg-pink-600 transition duration-300"
                onClick={buyHandler}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12 border-t pt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5">
            Product Description
          </h2>
          <p className="text-gray-700">{productDetails.description}</p>
        </div>

        {/* Specifications */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5">
            Specifications
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-gray-700 border">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-6 text-left font-semibold">Key</th>
                  <th className="py-3 px-6 text-left font-semibold">Value</th>
                </tr>
              </thead>
              <tbody>
                {productDetails.specifications &&
                  Object.entries(productDetails.specifications[0]).map(
                    ([key, value], index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-3 px-6 border">{key}</td>
                        <td className="py-3 px-6 border">
                          {typeof value === "object" ? (
                            <ul>
                              {Object.entries(value).map(
                                ([subKey, subValue], subIndex) => (
                                  <li key={subIndex}>
                                    {`${subKey}: ${subValue}`}
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
      </div>
    </div>
  );
}

export default ProductDetails;
