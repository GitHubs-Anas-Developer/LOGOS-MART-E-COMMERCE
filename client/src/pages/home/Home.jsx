import React, { useContext, useEffect } from "react";
import CategoriesBanner from "./categoryBanner/CategoriesBanner";
import CarouselBanner from "./carouselBanner/CarouselBanner";
import OfferContext from "../../context/Offer";
import OfferProducts from "../../components/offer/OfferProducts";
import WhatsAppButton from "../../components/icons/whatsApp/WhatsAppButton";
import BackToTopButton from "../../components/icons/backToTopButton/BackToTopButton";
import Subcategories from "../../components/subcategories/Subcategories";

function Home() {
  const {
    fetchDiscountedProducts,
    discount30to40,
    discount40to50,
    specialOffer,
  } = useContext(OfferContext);

  useEffect(() => {
    fetchDiscountedProducts();
  }, []);

  return (
    <div className="bg-gray-200">
      <CategoriesBanner />
      <CarouselBanner />
      <Subcategories />
      <OfferProducts discount={specialOffer} title="SPECIAL OFFERS" />
      <OfferProducts
        discount={discount30to40}
        title="Top Deals: 30% - 40% Off"
      />
      <OfferProducts
        discount={discount40to50}
        title="Top Deals: 40% - 50% Off"
      />
      <WhatsAppButton />
      <BackToTopButton />
    </div>
  );
}

export default Home;
