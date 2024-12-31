import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/User";
import { FaRegUserCircle } from "react-icons/fa";
import { AuthContext } from "../../context/Auth";

function MyProfile() {
  const { user } = useContext(UserContext);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center bg-white text-gray-800 p-6 border rounded-md shadow-sm">
        <FaRegUserCircle className="w-24 h-24 text-gray-600 border-2 border-gray-300 rounded-full mb-4" />
        {user ? (
          <div className="text-center">
            <h1 className="text-2xl font-semibold">{user.userName}</h1>
            <p className="text-gray-500 mt-2">{user.email}</p>
          </div>
        ) : (
          <p className="text-gray-500">Loading profile...</p>
        )}
      </div>

      {/* Profile Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <ProfileCard
          title="My Orders"
          description="Track and manage your orders."
          buttonText="View Orders"
          to="/myOrders"
        />
        <ProfileCard
          title="Saved Addresses"
          description="Edit and manage your delivery addresses."
          buttonText="Manage Addresses"
          to="/addresses"
        />
        <ProfileCard
          title="Wishlist"
          description="Browse and manage your saved items."
          buttonText="View Wishlist"
          to="/favorites"
        />
        <ProfileCard
          title="My Cart"
          description="Review and checkout items in your cart."
          buttonText="Go to Cart"
          to="/cart"
        />
      </div>

      {/* Logout Button */}
      <div className="text-center">
        <button
          className="py-3 px-6 bg-red-500 text-white rounded-lg shadow-sm transition-all duration-300 transform hover:bg-red-600 hover:scale-105"
          onClick={() => logout()}
          aria-label="Log out"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

function ProfileCard({ title, description, buttonText, to }) {
  return (
    <div className="bg-white border rounded-md shadow-sm p-6">
      <h3 className="text-xl font-medium text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        to={to}
        className="inline-block px-5 py-2 bg-blue-500 text-white rounded-md shadow-sm transition-all duration-300 hover:bg-blue-600 hover:scale-105"
        aria-label={buttonText}
      >
        {buttonText}
      </Link>
    </div>
  );
}

export default MyProfile;
