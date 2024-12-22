import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LiaShippingFastSolid, LiaAddressCard } from "react-icons/lia";
import { RiProductHuntLine } from "react-icons/ri";
import { BsCart } from "react-icons/bs";
import { SlHeart } from "react-icons/sl";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import Search from "../search/Search";
import UserContext from "../../context/User";
import { AuthContext } from "../../context/Auth";
import CartContext from "../../context/Cart";
import FavoriteContext from "../../context/Favorite";
import { IoBagHandleOutline } from "react-icons/io5";
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
    <header className="bg-blue-900  shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-white">
            LOGOS MART
          </Link>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 mx-4">
            <Search />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/products" className="text-white hover:text-gray-400">
              <RiProductHuntLine className="text-4xl" />
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
              <IoBagHandleOutline className="text-4xl" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-0 left-6  bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
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
                className="text-white flex items-center gap-x-2"
              >
                <FaRegUserCircle className="text-4xl" />
                {user ? user.userName : "Login"}
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
            {/* Cart Icon with Count */}
            <Link
              to="/cart"
              className="relative text-white hover:text-gray-400"
            >
              <BsCart className="text-2xl" />
              {cartCount > 0 && (
                <span className="absolute top-[-10px] right-[-8px] bg-red-500 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Favorites Icon with Count */}
            <Link
              to="/favorites"
              className="relative text-white hover:text-gray-400"
            >
              <SlHeart className="text-2xl" />
              {favoritesCount > 0 && (
                <span className="absolute top-[-10px] right-[-8px] bg-red-500 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white text-2xl focus:outline-none"
              aria-label="Toggle Menu"
            >
              {menuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-gray-800 text-white">
          <ul className="flex flex-col items-center py-4 space-y-3">
            <Link to="/trackOrder">Track Order</Link>
            <Link to="/notifications">Notifications</Link>
            <button onClick={handleLogout} className="text-red-500">
              {user ? "Logout" : "Login"}
            </button>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
