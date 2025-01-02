import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { RiProductHuntLine } from "react-icons/ri";
import { BsCart } from "react-icons/bs";
import { SlHeart } from "react-icons/sl";
import { FaRegUserCircle } from "react-icons/fa";
import Search from "../search/Search";
import UserContext from "../../context/User";
import { AuthContext } from "../../context/Auth";
import CartContext from "../../context/Cart";
import FavoriteContext from "../../context/Favorite";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { FaBell, FaTruck } from "react-icons/fa";
import "./Header.css";
import SearchPopup from "../search/searchPopup/SearchPopup";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(UserContext);
  const { logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const { favoritesCount } = useContext(FavoriteContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white   border-b">
      <div className="hidden md:flex bg-red-500 p-1 justify-center items-center overflow-hidden">
        <h1 className="text-2xl font-bold text-white animate-text-loop">
          Exclusive Deals Just for You! Enjoy amazing discounts on all your
          favorite items for a limited time. Don’t miss out!
        </h1>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-red-600">
            LOGOS MART
          </Link>

          {/* Search Bar */}

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="hidden md:block flex-1 mx-4 text-white">
              <Search />
            </div>

            <Link to="/products" className="text-white hover:text-gray-400">
              <RiProductHuntLine className="text-3xl text-blue-400" />
            </Link>
            {/* <Link
              to="/favorites"
              className="relative text-white hover:text-gray-400"
            >
              <SlHeart className="text-2xl" />
              {favoritesCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link> */}
            <Link
              to="/cart"
              className="relative text-white hover:text-gray-400"
            >
              <IoBagHandleOutline className="text-3xl text-blue-400" />
              {cartCount > 0 && (
                <span className="absolute top-[-5px] right-0 left-6  bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {/* <Link to="/trackOrder" className="text-white hover:text-gray-400">
              <LiaShippingFastSolid className="text-2xl" />
            </Link> */}
            {/* <Link
              to="/notifications"
              className="text-white hover:text-gray-400"
            >
              <IoIosNotificationsOutline className="text-2xl" />
            </Link> */}

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-3 px-4 py-2 border-2 border-blue-400 rounded-full bg-white hover:bg-gray-100 text-gray-800 hover:text-orange-600 transition-all duration-300 ease-in-out"
              >
                <FaRegUser className="text-xl text-gray-600" />
                <span className="text-base font-semibold">
                  {user ? `Hello, ${user.userName}` : "Login"}
                </span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                  <ul className="py-2 text-sm text-gray-700">
                    {user ? (
                      <>
                        <li>
                          <Link
                            to="/myprofile"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            My Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/myOrders"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            My Orders
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <li>
                        <Link
                          to="/login"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Login Now
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center space-x-4">
            <SearchPopup className="" />
            {/* Cart Icon with Count */}
            <Link
              to="/cart"
              className="relative text-white hover:text-gray-400"
            >
              <IoBagHandleOutline className="text-2xl text-blue-300" />
              {cartCount > 0 && (
                <span className="absolute top-[-5px] right-[-8px] bg-red-500 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Favorites Icon with Count */}
            <Link
              to="/favorites"
              className="relative text-white hover:text-gray-400"
            >
              <SlHeart className="text-2xl text-blue-300" />
              {favoritesCount > 0 && (
                <span className="absolute top-[-10px] right-[-8px] bg-red-500 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-blue-300 text-2xl focus:outline-none"
              aria-label="Toggle Menu"
            >
              {menuOpen ? (
                <IoIosCloseCircleOutline size={25} />
              ) : (
                <TiThMenu size={20} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-gray-800 text-white ">
          <ul className="flex flex-col items-center py-6 space-y-8">
            <li className="w-full">
              <Link
                to="/trackOrder"
                className="flex items-center justify-start w-full px-6 py-3 rounded-lg text-xl font-medium text-white hover:bg-gray-700 hover:text-gray-300 transition-all"
              >
                <FaTruck className="text-2xl mr-4" />
                Track Order
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/notifications"
                className="flex items-center justify-start w-full px-6 py-3 rounded-lg text-xl font-medium text-white hover:bg-gray-700 hover:text-gray-300 transition-all"
              >
                <FaBell className="text-2xl mr-4" />
                Notifications
              </Link>
            </li>
            <li className="w-full">
              <button
                onClick={handleLogout}
                className="flex items-center justify-start w-full px-6 py-3 rounded-lg text-xl font-medium text-red-500 hover:bg-red-600 hover:text-white transition-all"
              >
                <FaRegUser className="text-2xl mr-4" />
                {user ? "Logout" : "Login"}
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
