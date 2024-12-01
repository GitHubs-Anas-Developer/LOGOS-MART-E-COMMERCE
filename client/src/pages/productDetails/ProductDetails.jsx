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

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetchSingleProductDetails(id);
    fetchRelatedProducts(productDetails.subSubcategoryId);
    fetchProductReviews(productDetails._id);
    fetchAddress();
  }, [id]);

  const handleColorChange = (index) => setSelectedColorIndex(index);
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);

  const addtoCart = (e, productId) => {
    e.preventDefault();
    addToCart(productId);
  };

  const buyHandler = () => {
    if (address.length > 0) {
      navigate("/payment", { state: { product: productDetails } });
    } else {
      navigate("/shippingAddress", { state: { product: productDetails } });
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

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left: Product Images */}
          <div className="md:col-span-5">
            <div className="relative">
              <img
                src={selectedImage || productImages[0]}
                alt={productDetails.title}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="mt-4 flex gap-4 overflow-x-auto">
              {productImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  className={`h-20 w-20 rounded-md border ${
                    selectedImage === image
                      ? "border-blue-500"
                      : "border-gray-300"
                  } cursor-pointer`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="md:col-span-7">
            <h1 className="text-3xl font-bold text-gray-800">
              {productDetails.title}
            </h1>
            <div className="flex items-center space-x-2 mt-2">
              <FaStar className="text-yellow-500" />
              <span className="text-gray-600">{productDetails.rating} / 5</span>
            </div>
            <div className="mt-4 flex items-center space-x-4">
              <span className="text-3xl font-semibold text-green-600">
                {formatPrice(productDetails.offerPrice)}
              </span>
              {productDetails.discountPercentage > 0 && (
                <span className="text-lg text-red-500">
                  {productDetails.discountPercentage}% off
                </span>
              )}
            </div>
            <div className="mt-4 text-gray-700">
              <p>
                <strong>Stock:</strong>{" "}
                {productDetails.stock > 0 ? (
                  <span className="text-green-600">In Stock</span>
                ) : (
                  <span className="text-red-500">Out of Stock</span>
                )}
              </p>
              <p>
                <strong>Seller:</strong> {productDetails.seller}
              </p>
              <p>
                <strong>Warranty:</strong> {productDetails.warranty}
              </p>
            </div>

            {/* Color Options */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-black">Choose Color</h3>
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
                  >
                    {color.colorName}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-4">
              <button
                className="flex-1 bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition"
                onClick={(e) => addtoCart(e, productDetails._id)}
              >
                Add to Cart
              </button>
              <button
                className="flex-1 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
                onClick={buyHandler}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Specifications
          </h2>
          <table className="w-full border text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-blue-700">Key</th>
                <th className="py-2 px-4  text-blue-700">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(productDetails.specifications[0]).map(
                ([key, value], index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border text-black">{key}</td>
                    <td className="py-2 px-4 border text-black">
                      {typeof value === "object" ? (
                        <ul>
                          {Object.entries(value).map(
                            ([subKey, subValue], subIndex) => (
                              <li key={subIndex}>
                                {subKey}: {subValue}
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

        {/* Related Products and Reviews */}
        <RelatedProductsData />
        <ProductReviews />
        <AddReview productId={productDetails._id} />
      </div>
    </div>
  );
}

export default ProductDetails;
