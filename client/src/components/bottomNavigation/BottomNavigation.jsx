import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiProductHuntLine } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegHeart, FaRegUserCircle } from "react-icons/fa";
import UserContext from "../../context/User";

function BottomNavigation() {
  const location = useLocation();
  const { user } = useContext(UserContext);

  const navItems = [
    {
      to: "/",
      label: "Home",
      icon: <IoHomeOutline className="fill-current" />,
    },
    {
      to: "/categories",
      label: "Categories",
      icon: <BiCategoryAlt className="fill-current" />,
    },
    {
      to: "/products",
      label: "Products",
      icon: <RiProductHuntLine className="fill-current" />,
    },
    {
      to: "/myprofile",
      label: user ? user.userName : "My Profile",
      icon: <FaRegUserCircle className="fill-current" />,
    },
  ];

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-between items-center px-2 py-2 border-t border-gray-200"
      role="navigation"
    >
      {navItems.map((item, index) => (
        <div key={index}>
          <Link
            to={item.to}
            key={item.label}
            className={`flex flex-col items-center text-sm transition-all transform duration-200 ease-in-out ml-3 mr-3 ${
              location.pathname === item.to
                ? "text-blue-500 scale-110 font-semibold"
                : "text-gray-500 hover:text-blue-400 hover:scale-105"
            }`}
            aria-label={item.label}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="mt-1">{item.label}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default BottomNavigation;
