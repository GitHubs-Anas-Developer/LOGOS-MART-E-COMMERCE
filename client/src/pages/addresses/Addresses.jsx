import React, { useContext, useEffect, useState } from "react";
import { FaMapMarkedAlt, FaPhoneAlt, FaHome, FaLandmark } from "react-icons/fa";
import AddressContext from "../../context/Address";

function Addresses() {
  const {
    fetchAddress,
    address = [], // Default to empty array
    loading,
    error,
    updateAddress,
    deleteAddress,
    newAddress, // Ensure this is defined in your context
  } = useContext(AddressContext);

  const [editingAddress, setEditingAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    apartment: "",
    phoneNumber: "",
    landmark: "",
  });

  useEffect(() => {
    fetchAddress(); // Fetch the addresses on component load
  }, [fetchAddress]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    if (editingAddress) {
      updateAddress(formData); // Update address if editing
    } else {
      newAddress(formData); // Add new address
    }
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      apartment: "",
      phoneNumber: "",
      landmark: "",
    });
    setEditingAddress(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-4xl font-semibold mb-8 text-center text-gray-800">
        My Addresses
      </h2>

      <div className="text-center mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700 transition duration-300"
        >
          Add New Address
        </button>
      </div>

      {address.length === 0 ? (
        <p>No addresses found.</p>
      ) : (
        address.map((addr) => (
          <div
            key={addr.id || addr._id}
            className="bg-white p-6 mb-4 rounded-lg shadow-sm"
          >
            <h3 className="text-xl font-bold">{addr.name}</h3>
            <p>{addr.street}</p>
            <p>
              {addr.city}, {addr.state} - {addr.postalCode}
            </p>
            <p>{addr.country}</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => {
                  setEditingAddress(addr.id || addr._id);
                  setFormData(addr);
                  setIsModalOpen(true);
                }}
                className="bg-indigo-600 text-white py-1 px-4 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => deleteAddress(addr.id || addr._id)}
                className="bg-red-600 text-white py-1 px-4 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-4 sm:mx-6 flex flex-col">
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-gray-200">
            <h3 className="text-lg sm:text-xl font-bold text-center">
              {editingAddress ? "Edit Address" : "New Address"}
            </h3>
          </div>
      
          {/* Scrollable Content */}
          <div className="p-6 sm:p-8 overflow-y-auto max-h-[60vh]">
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-500"
              />
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                placeholder="Street"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-500"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-500"
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-500"
              />
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                placeholder="Postal Code"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-500"
              />
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Country"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-500"
              />
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-500"
              />
              <input
                type="text"
                name="apartment"
                value={formData.apartment}
                onChange={handleInputChange}
                placeholder="Apartment"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-500"
              />
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
                placeholder="Landmark"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-500"
              />
            </div>
          </div>
      
          {/* Footer */}
          <div className="p-6 sm:p-8 border-t border-gray-200 flex justify-end space-x-4">
            <button
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
              className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveChanges}
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      
      )}
    </div>
  );
}

export default Addresses;
