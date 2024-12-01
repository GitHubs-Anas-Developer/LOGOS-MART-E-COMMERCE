import axios from "axios";
import { createContext, useContext, useState } from "react";
import { AuthContext } from "./Auth";
import api from "../utils/axiosInstance";

const OrderContext = createContext();

export const OrderContextProvider = ({ children }) => {
  const { userId } = useContext(AuthContext);

  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null); // For a specific order's details

  // Fetch all orders for the user
  const fetchOrderList = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const response = await api.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/orders/list/${userId}`
      );
      setOrderList(response.data.orders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err?.response?.data?.message || "Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };
  const fetchOrderDetails = async (orderId) => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const response = await api.get(`/api/v1/order-details/${orderId}`);
      setOrderDetails(response.data.orderDetails || null);
    } catch (err) {
      console.error("Error fetching order details:", err);
      setError("Failed to fetch order details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orderList,
        loading,
        error,
        fetchOrderList,
        fetchOrderDetails,
        orderDetails,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
