import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/axiosInstance';
import { Link } from 'react-router-dom';
// Utility function to format prices
const formatPrice = (price) => `₹${price.toLocaleString()}`;

function PriceUnderProducts() {
    // Access the price from the URL params
    const { price } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [products, setProducts] = useState([]);

    // Fetch products under the specified price
    const fetchUnderPriceProducts = async () => {
        try {
            const response = await api.get(`/api/v1/under-price/products/${price}`);
            if (response.status === 200) {
                setProducts(response.data.products);
            }
        } catch (err) {
            setError('Failed to load products. Please try again later.');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchUnderPriceProducts();
    }, [price]);


    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">
                Products Under {formatPrice(price)}
            </h1>
            <p className="text-center text-lg text-gray-600 mb-8">
                Browse products available for the price of {formatPrice(price)}.
            </p>

            {loading && <p className="text-center text-lg text-gray-500">Loading products...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && !error && products.length === 0 && (
                <p className="text-center text-lg text-gray-600">No products found under this price.</p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {products.map((product) => (
                    <Link to={`/productDetails/${product._id}`} key={product._id} className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition-shadow">
                        {/* Product Image */}
                        <img
                            src={product.cardImage}
                            alt={product.title}
                            className="w-full h-48 object-contain mb-4 rounded-lg"
                        />

                        {/* Product Title */}
                        <h2 className="text-xl font-bold mb-2 truncate">{product.title}</h2>

                        {/* Ratings */}
                        <div className="flex items-center mb-2">
                            <span className="bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded">
                                ⭐ {product.rating}
                            </span>
                            <span className="ml-2 text-xs text-gray-500">({product.reviews?.length || 0} reviews)</span>
                        </div>

                        {/* Pricing */}
                        {/* Price and Discount */}
                        <div className="flex items-center justify-between mb-2">
                            {/* Offer Price */}
                            <span className="text-xl font-bold text-red-600">
                                {product.offerPrice
                                    ? formatPrice(product.offerPrice)
                                    : formatPrice(
                                        product.variants?.[0]?.offerPrice
                                    ) || ""}
                            </span>

                            {/* Discount Percentage */}
                            {(product.discountPercentage ||
                                product.variants?.[0]?.discountPercentage) && (
                                    <span className="text-sm font-medium text-green-600">
                                        {product.discountPercentage
                                            ? `${product.discountPercentage}% OFF`
                                            : `${product.variants?.[0]?.discountPercentage}% OFF`}
                                    </span>
                                )}
                        </div>
                        <div className="flex justify-between items-center">
                            {/* Original Price */}
                            <div className="text-sm text-gray-400 line-through">
                                {product.price
                                    ? formatPrice(product.price)
                                    : formatPrice(product.variants?.[0]?.price) || ""}
                            </div>

                            {/* Discount Savings */}
                            {(product.offerPrice && product.price) ||
                                (product.variants?.[0]?.offerPrice &&
                                    product.variants?.[0]?.price) ? (
                                <span className="ml-2 bg-green-100 text-green-600 font-medium text-xs px-2 py-1 rounded-lg shadow-sm">
                                    Save ₹
                                    {product.offerPrice && product.price
                                        ? product.price - product.offerPrice
                                        : product.variants?.[0]?.price -
                                        product.variants?.[0]?.offerPrice}
                                </span>
                            ) : null}
                        </div>


                    </Link>
                ))}
            </div>
        </div>
    );
}

export default PriceUnderProducts;
