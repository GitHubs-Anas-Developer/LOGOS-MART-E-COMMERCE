import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function FooterDuplicate() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-600 text-white shadow-md">
      <div className="w-full mx-auto max-w-screen-xl p-6 flex flex-col md:flex-row md:justify-between md:items-center">
        {/* Footer Brand & Copyright */}
        <span className="text-sm text-center md:text-left">
          © 2023{" "}
          <a href="https://logosmart.com/" className="font-bold hover:underline">
            LogosMart™
          </a>
          . Excellence in Every Design.
        </span>

        {/* Footer Links */}
        <ul className="flex flex-wrap items-center justify-center mt-4 md:mt-0 text-sm font-medium space-x-6">
          <li>
            <a href="#" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Careers
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Support
            </a>
          </li>
        </ul>

        {/* Social Media Links */}
        <div className="flex justify-center mt-4 md:mt-0 space-x-4">
          <a
            href="#"
            className="p-2 bg-white text-gray-700 rounded-full hover:bg-gray-800 hover:text-white transition"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="p-2 bg-white text-gray-700 rounded-full hover:bg-gray-800 hover:text-white transition"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            className="p-2 bg-white text-gray-700 rounded-full hover:bg-gray-800 hover:text-white transition"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            className="p-2 bg-white text-gray-700 rounded-full hover:bg-gray-800 hover:text-white transition"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default FooterDuplicate;
