import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/User";
import { FaRegUserCircle } from "react-icons/fa";
import { AuthContext } from "../../context/Auth";

function MyProfile() {
  const { user } = useContext(UserContext);
  const { logout } = useContext(AuthContext);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10">
      {/* Profile Header */}
      <div className="flex flex-col items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl shadow-2xl p-8">
        <FaRegUserCircle className="w-28 h-28 text-white border-4 border-white rounded-full mb-4" />
        {user ? (
          <div className="text-center">
            <h1 className="text-4xl font-bold">{user.userName}</h1>
            <p className="text-gray-200 mt-2">{user.email}</p>
          </div>
        ) : (
          <p className="text-gray-200">Loading profile...</p>
        )}
      </div>

      {/* Profile Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
          className="py-3 px-6 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300"
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
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-transform duration-300">
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <Link
        to={to}
        className="inline-block px-5 py-2 bg-blue-500 dark:bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-300"
        aria-label={buttonText}
      >
        {buttonText}
      </Link>
    </div>
  );
}

export default MyProfile;
