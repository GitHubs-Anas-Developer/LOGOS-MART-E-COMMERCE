import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "6282862585"; // Replace with your WhatsApp number
  const message = encodeURIComponent("Hi, I need assistance with a product!");

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-36 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp size={20} />
    </a>
  );
};

export default WhatsAppButton;
