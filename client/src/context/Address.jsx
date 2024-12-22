import { createContext, useContext, useState } from "react";
import { AuthContext } from "./Auth";
import { Toaster, toast } from "react-hot-toast";
import api from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const AddressContext = createContext();

export const AddressContextProvider = ({ children }) => {
  const { userId } = useContext(AuthContext); // Get userId from AuthContext
  const [address, setAddress] = useState([]);

  const navigate = useNavigate();

  const newAddress = async (addressData) => {
    try {
      const response = await api.post(
        `/api/v1/new/address/${userId}`, // Proper URL format
        addressData // Send the data directly
      );
      toast.success("Address submitted successfully!");
      navigate("/payment");
    } catch (error) {
      toast.error("Failed to submit address. Please try again.");
      console.error("Error submitting address:", error);
    }
  };

  const fetchAddress = async () => {
    try {
      const response = await api.get(`/api/v1/address/${userId}`);
      setAddress(response.data.addresses);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AddressContext.Provider value={{ newAddress, fetchAddress, address }}>
      {children}
      <Toaster /> {/* Ensure toast notifications work */}
    </AddressContext.Provider>
  );
};

export default AddressContext;
