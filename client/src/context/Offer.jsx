import axios from "axios";
import { createContext, useState } from "react";
import api from "../utils/axiosInstance";

const OfferContext = createContext();

export const OfferContextProvider = ({ children }) => {
  const [discount30to40, setDiscount30to40] = useState([]);
  const [discount40to50, setDiscount40to50] = useState([]);

  const fetchDiscountedProducts = async () => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/offer/products`
      );

      setDiscount30to40(response.data.discount30to40);
      setDiscount40to50(response.data.discount40to50);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <OfferContext.Provider
      value={{ fetchDiscountedProducts, discount30to40, discount40to50 }}
    >
      {children}
    </OfferContext.Provider>
  );
};

export default OfferContext;
