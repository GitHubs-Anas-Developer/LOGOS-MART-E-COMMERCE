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

  const [selectedVariant, setSelectedVariant] = useState(null);
  const handleVariantChange = (event) => {
    setSelectedVariant(productDetails.variants[event.target.value]);
  };

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
      minimumFractionDigits: 0,
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

  console.log("productDetails", productDetails.variants[0].offerPrice);
  return (
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
                className="w-full h-96 object-contain rounded-lg shadow-md"
              />
            </div>
            <div className="mt-4 flex gap-4 overflow-x-auto">
              {productImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  className={`h-20 w-auto rounded-md border ${
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
            <h1 className="text-2xl font-bold text-gray-800">
              {productDetails.title}
            </h1>
            <div className="flex items-center space-x-2 mt-2">
              <FaStar className="text-yellow-500" />
              <span className="text-gray-600">{productDetails.rating} / 5</span>
            </div>
            <div className="mt-4 flex items-center space-x-4">
              {/* Price with selected variant or default price */}
              <span className="text-3xl font-semibold text-green-600">
                {selectedVariant
                  ? formatPrice(selectedVariant.offerPrice)
                  : formatPrice(
                      productDetails.offerPrice ||
                        productDetails.variants[0]?.offerPrice ||
                        0
                    )}
              </span>

              {/* Discount Percentage */}
              <span className="text-2xl font-semibold text-yellow-700">
                {selectedVariant
                  ? selectedVariant.discountPercentage
                  : productDetails.discountPercentage ||
                    productDetails.variants[0]?.discountPercentage ||
                    0}
                %
              </span>

              {/* Original Price with line-through */}
              <span className="text-2xl font-semibold text-gray-400 line-through">
                {selectedVariant
                  ? formatPrice(selectedVariant.price)
                  : productDetails.price ||
                    formatPrice(productDetails.variants[0]?.price) ||
                    0}
              </span>

              {/* Discount label */}
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
                <strong>Brand:</strong> {productDetails.brand}
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

            <div className="mt-4">
              {productDetails.variants.map((variant, index) => (
                <button
                  key={index}
                  value={index}
                  onClick={handleVariantChange}
                  className="text-black p-2 border border-black m-1 rounded-lg"
                >
                  {variant.ram} RAM + {variant.storage} Storage
                </button>
              ))}
            </div>

            <div className="delivery-container p-4 rounded bg-white shadow m-5">
              <h2 className="text-primary mb-3">Delivery Details</h2>
              <p className="mb-2 text-black">
                Estimated delivery time:
                <strong className="text-success">
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
                  })}{" "}
                  business days
                </strong>
              </p>
              <p className="mb-2 text-black">
                Delivery cost:
                <strong
                  className={`text-${
                    productDetails.delivery.cost === 0 ? "success" : "danger"
                  }`}
                >
                  {productDetails.delivery.cost === 0
                    ? "Free"
                    : `$${productDetails.delivery.cost}`}
                </strong>
              </p>
              <p className="text-muted text-black">
                For more details, visit our{" "}
                <a
                  href="/delivery-info"
                  className="text-info text-decoration-underline"
                >
                  Delivery Information
                </a>{" "}
                page.
              </p>
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

        <div className="description-container p-4 rounded bg-light shadow-sm">
          <h2 className="text-black mb-3 font-bold">Description</h2>
          <p className=" text-black">{productDetails.description}</p>
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
