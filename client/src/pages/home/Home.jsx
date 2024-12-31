import React, { useContext, useEffect, useState } from "react";
import CategoriesBanner from "./categoryBanner/CategoriesBanner";
import CarouselBanner from "./carouselBanner/CarouselBanner";
import OfferContext from "../../context/Offer";
import OfferProducts from "../../components/offer/OfferProducts";
import WhatsAppButton from "../../components/icons/whatsApp/WhatsAppButton";
import BackToTopButton from "../../components/icons/backToTopButton/BackToTopButton";
import Subcategories from "../../components/subcategories/Subcategories";
import Categories from "../../components/categories/Categories";
import Brands from "../../components/brands/Brands";

function Home() {
  const {
    fetchDiscountedProducts,
    discount30to40,
    discount40to50,
    specialOffer,
    loading,
    error,
  } = useContext(OfferContext);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    fetchDiscountedProducts();
  }, []);

  return (
    <div>
      {/* Static components */}
      <CategoriesBanner />
      <CarouselBanner />
      <Subcategories />
      {/* <Categories /> */}
      <WhatsAppButton />
      <BackToTopButton />

      {/* Offer-related components, displayed based on loading and error */}
      <div className="py-10">
        {loading && (
          <div className="text-center text-blue-500">Loading offers...</div>
        )}

        {error && (
          <div className="text-center text-red-500">
            {error || "Failed to load offers. Please try again later."}
          </div>
        )}

        {!loading && !error && (
          <>
            <OfferProducts
              discount={specialOffer}
              title="SPECIAL OFFERS"
              isLoading={loading}
            />
            <OfferProducts
              discount={discount30to40}
              title="Top Deals: 30% - 40% Off"
              isLoading={loading}
            />
            <OfferProducts
              discount={discount40to50}
              title="Top Deals: 40% - 50% Off"
              isLoading={loading}
            />
          </>
        )}
      </div>
      <Brands />
    </div>
  );
}

export default Home;
