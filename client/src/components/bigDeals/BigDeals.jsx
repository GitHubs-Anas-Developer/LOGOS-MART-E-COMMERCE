import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import OfferContext from '../../context/Offer';

function BigDeals() {
    const { bigDeals, loading, error } = useContext(OfferContext);


    // Helper function to format price
    const formatPrice = (price) => `₹${price.toFixed(2)}`;

    return (
        <div className="p-1  rounded-lg ">
            <div className="flex items-center justify-between mb-6 space-x-1">
                {/* Left: Big Deals Title */}
                <h2 className="text-2xl font-extrabold text-purple-800 tracking-tight">
                    Big Deals 🎉
                </h2>

                {/* Right: More Button */}
                <div className='pr-2'>
                    <Link
                        to="/more-deals"  // Replace with the correct link
                        className="px-5 py-3 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 text-white text-lg font-semibold rounded-md shadow-md hover:scale-105 transform transition-all duration-300"
                    >
                        More
                    </Link>

                </div>
            </div>

            {loading && <p className="text-center text-purple-600">Loading deals...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && bigDeals.length > 0 ? (
                <div className="flex overflow-x-auto space-x-2 scrollbar-hide bg-gradient-to-r from-pink-300 via-yellow-200 to-yellow-500 p-2">
                    {bigDeals.map((product, index) => (
                        <Link
                            key={index}
                            to={`/productDetails/${product._id}`}
                            className="flex-none w-40 transform hover:scale-105 transition-transform duration-300"
                        >
                            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
                                {/* Product Image */}
                                <img
                                    src={product.cardImage}
                                    alt={`${product.name} product image`}
                                    className="w-full h-28 object-contain"
                                />

                                {/* Discount Badge */}
                                {/* {(product.discountPercentage || product.variants?.[0]?.discountPercentage) && (
                                    <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        {product.discountPercentage
                                            ? `${product.discountPercentage}% OFF`
                                            : `${product.variants?.[0]?.discountPercentage}% OFF`}
                                    </span>
                                )} */}

                                {/* Product Details */}
                                <div className="p-4 text-center bg-gray-50">
                                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                                        {product.title}
                                    </h3>

                                    {/* Rating */}
                                    {/* <div className="flex justify-center items-center my-2">
                                        <FaStar className="text-yellow-500 mr-1" />
                                        <span className="text-gray-600 text-sm">
                                            {product.rating || 'No Rating'}
                                        </span>
                                    </div> */}

                                    {/* Price Section */}
                                    {/* <div className="flex justify-center items-center space-x-2">
                                        {product.offerPrice || product.variants?.[0]?.offerPrice ? (
                                            <span className="text-lg text-green-600 font-extrabold">
                                                {formatPrice(
                                                    product.offerPrice || product.variants?.[0]?.offerPrice
                                                )}
                                            </span>
                                        ) : null}
                                        {(product.price || product.variants?.[0]?.price) && (
                                            <span className="text-sm text-gray-500 line-through font-bold">
                                                {formatPrice(product.price || product.variants?.[0]?.price)}
                                            </span>
                                        )}
                                    </div> */}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                !loading && <p className="text-center text-gray-600">No deals available.</p>
            )}
        </div>
    );
}

export default BigDeals;
