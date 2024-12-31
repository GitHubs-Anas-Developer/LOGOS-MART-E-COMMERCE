import axios from "axios";
import { createContext, useState } from "react";
import api from "../utils/axiosInstance";

const OfferContext = createContext();

export const OfferContextProvider = ({ children }) => {
  // State variables for offers
  const [discount30to40, setDiscount30to40] = useState([]);
  const [discount40to50, setDiscount40to50] = useState([]);
  const [specialOffer, setSpecialOffer] = useState([]);

  // State variables for loading and error handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch discounted products
  const fetchDiscountedProducts = async () => {
    setLoading(true); // Set loading to true when the request starts
    setError(null); // Reset any previous errors

    try {
      const response = await api.get(`/api/v1/offer/products`);

      setDiscount30to40(response.data.discount30to40);
      setDiscount40to50(response.data.discount40to50);
      setSpecialOffer(response.data.specialOffer);
    } catch (err) {
      setError("Failed to load offers. Please try again later.");
      console.log(err);
    } finally {
      setLoading(false); // Set loading to false once the request is complete
    }
  };

  return (
    <OfferContext.Provider
      value={{
        fetchDiscountedProducts,
        discount30to40,
        discount40to50,
        specialOffer,
        loading,
        error,
      }}
    >
      {children}
    </OfferContext.Provider>
  );
};

export default OfferContext;
