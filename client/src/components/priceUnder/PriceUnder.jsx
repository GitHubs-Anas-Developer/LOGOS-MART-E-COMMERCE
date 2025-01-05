import React from 'react';
import image1 from '../../assets/price_under_images/Frame_190._CB583975853_.png';
import image2 from '../../assets/price_under_images/Frame_191._CB583975853_.png';
import image3 from '../../assets/price_under_images/Frame_192._CB583975853_.png';
import image4 from '../../assets/price_under_images/Frame_193._CB583975853_.png';
import image5 from '../../assets/price_under_images/Frame_194._CB583975853_.png';
import image6 from '../../assets/price_under_images/Frame_195._CB583975853_.png';
import image7 from '../../assets/price_under_images/Frame_196._CB583975853_.png';
import image8 from '../../assets/price_under_images/Frame_197._CB583975853_.png';
import { Link } from 'react-router-dom';

function PriceUnder() {
    const prices = [199, 299, 499, 699, 999, 1299, 1499, 1999]; // Example prices
    const images = [image1, image2, image3, image4, image5, image6, image7, image8];

    return (
        <div className="bg-gradient-to-r from-green-100 to-green-200 ">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-extrabold text-purple-800 mb-3">Top Deals for You</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 px-3">
                {prices.map((price, index) => (
                    <Link
                        to={`/priceUnderProducts/${price}`}
                        key={index}
                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition-all group"
                    >
                        {/* Image */}
                        <img
                            src={images[index]}
                            alt={`Product under ₹${price}`}
                            className="w-full  object-contain group-hover:opacity-90 transition-opacity duration-300"
                        />

                        {/* Price Tag */}
                        <div className="bg-purple-800 text-white text-center py-2">
                            <span className="text-lg font-semibold">Under ₹{price}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default PriceUnder;
