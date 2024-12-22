import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r bg-blue-900 to-indigo-600 text-white  shadow mt-6">
      <div className="w-full mx-auto max-w-screen-xl p-6 flex flex-col md:flex-row md:justify-between md:items-center">
        {/* Footer Brand & Copyright */}
        <span className="text-sm text-center md:text-left">
          © 2023{" "}
          <a href="https://flowbite.com/" className="font-bold hover:underline">
            Flowbite™
          </a>
          . All Rights Reserved.
        </span>

        {/* Footer Links */}
        <ul className="flex flex-wrap items-center justify-center mt-4 md:mt-0 text-sm font-medium space-x-6">
          <li>
            <a href="#" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>

        {/* Social Media Links */}
        <div className="flex justify-center mt-4 md:mt-0 space-x-4">
          <a
            href="#"
            className="p-2 bg-white text-blue-500 rounded-full hover:bg-blue-600 hover:text-white transition"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="p-2 bg-white text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            className="p-2 bg-white text-pink-500 rounded-full hover:bg-pink-600 hover:text-white transition"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            className="p-2 bg-white text-blue-700 rounded-full hover:bg-blue-800 hover:text-white transition"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
