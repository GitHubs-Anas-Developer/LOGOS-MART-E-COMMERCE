import React, { useEffect, useState, useContext } from "react";
import AddressContext from "../../context/Address";
import { useNavigate } from "react-router-dom";

function AddressForm() {
  // Get newAddress function from AddressContext
  const { newAddress } = useContext(AddressContext);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const [address, setAddress] = useState({
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
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  // Validate the form before submission
  const validateForm = () => {
    const newErrors = {};
    if (!address.name) newErrors.name = "Name is required";
    if (!address.street) newErrors.street = "Street address is required";
    if (!address.city) newErrors.city = "City is required";
    if (!address.state) newErrors.state = "State is required";
    if (!address.postalCode) newErrors.postalCode = "Postal code is required";
    if (!address.country) newErrors.country = "Country is required";

    if (address.landmark && address.landmark.length < 3) {
      newErrors.landmark = "Landmark must be at least 3 characters";
    }

    // Basic postal code validation (e.g., 6 digits for the postal code)
    if (address.postalCode && !/^\d{6}$/.test(address.postalCode)) {
      newErrors.postalCode = "Postal code should be 6 digits";
    }

    // Basic phone number validation (optional)
    if (address.phoneNumber && !/^\d{10}$/.test(address.phoneNumber)) {
      newErrors.phoneNumber = "Phone number should be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Pass the validated address to the newAddress function in context
      newAddress(address);
      setIsSubmitted(true); // Set submission status
      navigate("/payment");
      // Optionally reset the form after successful submission
      // setAddress({
      //   name: "",
      //   street: "",
      //   city: "",
      //   state: "",
      //   postalCode: "",
      //   country: "",
      //   apartment: "",
      //   phoneNumber: "",
      //   landmark: "",
      // });
    } else {
      setIsSubmitted(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 rounded-lg shadow-xl bg-white m-10 border border-black">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Address Form
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={address.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Street Address */}
        <div className="mb-6">
          <label
            htmlFor="street"
            className="block text-sm font-medium text-gray-700"
          >
            Street Address:
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={address.street}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
          {errors.street && (
            <p className="text-red-600 text-sm mt-1">{errors.street}</p>
          )}
        </div>

        {/* City */}
        <div className="mb-6">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={address.city}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
          {errors.city && (
            <p className="text-red-600 text-sm mt-1">{errors.city}</p>
          )}
        </div>

        {/* State */}
        <div className="mb-6">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
            State:
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={address.state}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
          {errors.state && (
            <p className="text-red-600 text-sm mt-1">{errors.state}</p>
          )}
        </div>

        {/* Postal Code */}
        <div className="mb-6">
          <label
            htmlFor="postalCode"
            className="block text-sm font-medium text-gray-700"
          >
            Postal Code:
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={address.postalCode}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
          {errors.postalCode && (
            <p className="text-red-600 text-sm mt-1">{errors.postalCode}</p>
          )}
        </div>

        {/* Country */}
        <div className="mb-6">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country:
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={address.country}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
          {errors.country && (
            <p className="text-red-600 text-sm mt-1">{errors.country}</p>
          )}
        </div>

        {/* Optional Fields */}
        <div className="mb-6">
          <label
            htmlFor="apartment"
            className="block text-sm font-medium text-gray-700"
          >
            Apartment (optional):
          </label>
          <input
            type="text"
            id="apartment"
            name="apartment"
            value={address.apartment}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="landmark"
            className="block text-sm font-medium text-gray-700"
          >
            Landmark (optional):
          </label>
          <input
            type="text"
            id="landmark"
            name="landmark"
            value={address.landmark}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          {errors.landmark && (
            <p className="text-red-600 text-sm mt-1">{errors.landmark}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number (optional):
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={address.phoneNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          {errors.phoneNumber && (
            <p className="text-red-600 text-sm mt-1">{errors.phoneNumber}</p>
          )}
        </div>

        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddressForm;
