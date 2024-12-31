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
  const updateAddress = async (formData) => {
    console.log("formData......",formData);
    
    try {
      // Send the updated address to the server
      const response = await api.put("/api/v1/update/address", formData);

      // Check the response
      if (response.status === 200) {
        console.log("Address updated successfully:", response.data);
        alert("Address updated successfully!");
        // Optionally update state or context to reflect changes in the UI
      } else {
        console.error("Failed to update address. Status:", response.status);
        alert("Failed to update the address. Please try again.");
      }
    } catch (error) {
      console.error("Error updating address:", error.message);
      alert("An error occurred while updating the address.");
    }
  };

  const deleteAddress = async (addressId) => {
    console.log("addressId", addressId);

    try {
      const response = await api.delete("/api/v1/delete/address", {
        data: { addressId }, // Pass the addressId in the data property
      });
      console.log("response", response);

      if (response.status === 200) {
        await fetchAddress();
        toast.success("Address deleted successfully:", response.data);
        // Optionally, refresh the address list or update UI
      } else {
        toast.error("Failed to delete address. Status:", response.status);
      }
    } catch (error) {
      console.error("Error while deleting address:", error.message);
      alert("Failed to delete address. Please try again.");
    }
  };

  return (
    <AddressContext.Provider
      value={{
        newAddress,
        fetchAddress,
        address,
        updateAddress,
        deleteAddress,
      }}
    >
      {children}
      <Toaster /> {/* Ensure toast notifications work */}
    </AddressContext.Provider>
  );
};

export default AddressContext;
