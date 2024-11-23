import React, { useEffect, useState, useContext } from "react";
import AddressContext from "../../context/Address";
import OnlinePayment from "../onlinePayment/OnlinePayment";

function Payment() {
  const [selectedOption, setSelectedOption] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editableAddressId, setEditableAddressId] = useState(null);
  const [editableAddress, setEditableAddress] = useState({});
  const [proceedToPayment, setProceedToPayment] = useState(false); // Added
  const { fetchAddress, address, error, updateAddress } =
    useContext(AddressContext);

  useEffect(() => {
    fetchAddress().finally(() => setIsLoading(false));
  }, []);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handlePayment = () => {
    if (!selectedOption) {
      alert("Please select a payment option.");
      return;
    }
    if (selectedOption === "online") {
      setProceedToPayment(true); // Trigger OnlinePayment component
    } else if (selectedOption === "cod") {
      console.log("Order placed with Cash on Delivery.");
    }
  };

  const handleEdit = (addr) => {
    setEditableAddressId(addr._id);
    setEditableAddress(addr);
  };

  const handleSave = () => {
    if (
      !editableAddress.name ||
      !editableAddress.street ||
      !editableAddress.city ||
      !editableAddress.state ||
      !editableAddress.postalCode
    ) {
      alert("All fields are required!");
      return;
    }
    updateAddress(editableAddress); // Assume updateAddress is a context function
    setEditableAddressId(null);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setEditableAddress((prev) => ({ ...prev, [name]: value }));
  };

  if (proceedToPayment && selectedOption === "online") {
    return <OnlinePayment address={address} />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white shadow-lg rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Select Payment Method
        </h1>

        {/* Address Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">Your Address</h2>
          {isLoading ? (
            <p className="text-center text-gray-500">
              Loading your addresses...
            </p>
          ) : error ? (
            <p className="text-sm text-red-500 mt-2 text-center">
              Unable to fetch addresses. Please try again later.
            </p>
          ) : address.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {address.map((addr) => (
                <li key={addr._id} className="border p-3 rounded-lg bg-gray-50">
                  {editableAddressId === addr._id ? (
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={editableAddress.name}
                        onChange={handleAddressChange}
                        className="border rounded-lg p-2 w-full mb-2 text-black"
                        placeholder="Name"
                      />
                      <input
                        type="text"
                        name="street"
                        value={editableAddress.street}
                        onChange={handleAddressChange}
                        className="border rounded-lg p-2 w-full mb-2 text-black"
                        placeholder="Street"
                      />
                      <input
                        type="text"
                        name="city"
                        value={editableAddress.city}
                        onChange={handleAddressChange}
                        className="border rounded-lg p-2 w-full mb-2 text-black"
                        placeholder="City"
                      />
                      <input
                        type="text"
                        name="state"
                        value={editableAddress.state}
                        onChange={handleAddressChange}
                        className="border rounded-lg p-2 w-full mb-2 text-black"
                        placeholder="State"
                      />
                      <input
                        type="text"
                        name="postalCode"
                        value={editableAddress.postalCode}
                        onChange={handleAddressChange}
                        className="border rounded-lg p-2 w-full mb-2 text-black"
                        placeholder="Postal Code"
                      />
                      <button
                        onClick={handleSave}
                        className="bg-green-500 text-white py-2 px-4 rounded-lg"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-700">{addr.name}</p>
                      <p className="text-sm text-gray-500">
                        {addr.street}, {addr.city}
                      </p>
                      <p className="text-sm text-gray-500">
                        {addr.state}, {addr.postalCode}
                      </p>
                      <button
                        onClick={() => handleEdit(addr)}
                        className="text-blue-500 text-sm mt-2"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 mt-2">
              No address found. Please add one in your account settings.
            </p>
          )}
        </div>

        {/* Payment Options */}
        <div className="space-y-4 mt-6">
          <div
            onClick={() => handleOptionChange("online")}
            className={`border rounded-lg p-4 cursor-pointer flex items-center transition ${
              selectedOption === "online"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            <div className="flex-grow">
              <h2 className="text-lg font-medium text-gray-800">
                Online Payment
              </h2>
              <p className="text-sm text-gray-600">
                Pay securely with credit card, UPI, or net banking.
              </p>
            </div>
            {selectedOption === "online" && (
              <span className="text-blue-500 font-bold">✓</span>
            )}
          </div>

          <div
            onClick={() => handleOptionChange("cod")}
            className={`border rounded-lg p-4 cursor-pointer flex items-center transition ${
              selectedOption === "cod"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            <div className="flex-grow">
              <h2 className="text-lg font-medium text-gray-800">
                Cash on Delivery
              </h2>
              <p className="text-sm text-gray-600">
                Pay when your order is delivered to your doorstep.
              </p>
            </div>
            {selectedOption === "cod" && (
              <span className="text-blue-500 font-bold">✓</span>
            )}
          </div>
        </div>

        <button
          onClick={handlePayment}
          className={`mt-6 w-full py-3 text-white font-medium rounded-lg transition ${
            selectedOption
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!selectedOption}
        >
          Proceed
        </button>
      </div>
    </div>
  );
}

export default Payment;
