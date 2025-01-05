import React from "react";

function Footer() {
  const dt = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-4 mb-16">
      <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row md:justify-between items-center px-6">
        {/* Footer Text */}
        <span className="text-sm text-center md:text-left mb-4 md:mb-0">
          ©  {dt} {""}
          <a
            href="https://logosmart.com/"
            className="font-bold hover:underline"
          >
            LogosMart™
          </a>
          . All rights reserved. Developed by{" "}
          <a href="#" className="font-bold hover:underline">
            Anas
          </a>
          .
        </span>

        {/* Footer Links */}
        <ul className="flex space-x-4 text-sm">
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
      </div>
    </footer>
  );
}

export default Footer;
