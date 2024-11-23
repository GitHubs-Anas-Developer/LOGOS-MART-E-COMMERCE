import { createContext, useContext, useState } from "react";
import { AuthContext } from "./Auth";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const AddressContext = createContext();

export const AddressContextProvider = ({ children }) => {
  const { userId } = useContext(AuthContext); // Get userId from AuthContext
  const [address, setAddress] = useState([]);

  const newAddress = async (addressData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/new/address/${userId}`, // Proper URL format
        addressData // Send the data directly
      );
      toast.success("Address submitted successfully!");
      console.log("Address submitted:", response.data);
    } catch (error) {
      toast.error("Failed to submit address. Please try again.");
      console.error("Error submitting address:", error);
    }
  };

  const fetchAddress = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/address/${userId}`
      );
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