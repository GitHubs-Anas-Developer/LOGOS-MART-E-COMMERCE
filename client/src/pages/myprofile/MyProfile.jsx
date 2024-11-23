import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/user";
import { FaRegUserCircle } from "react-icons/fa";
import { AuthContext } from "../../context/Auth";

function MyProfile() {
  const { user } = useContext(UserContext);
  const { logout } = useContext(AuthContext);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-lg">
      {/* Profile Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
        {user ? (
          <div className="flex items-center space-x-6">
            <FaRegUserCircle className="w-24 h-24 text-gray-400 border-2 border-gray-200 rounded-full" />
            <div>
              <h2 className="text-3xl font-semibold text-gray-800">
                {user.userName}
              </h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-700">Loading profile...</p>
        )}
      </div>

      {/* Profile Sections */}
      <div className="space-y-6">
        <Section
          title="My Orders"
          description="View your order history and track recent orders."
          buttonText="View Orders"
          to="/myOrders"
        />
        <Section
          title="Saved Addresses"
          description="Manage your delivery addresses."
          buttonText="Edit Addresses"
          to="/addresses"
        />
        <Section
          title="Wishlist"
          description="View items you've saved for later."
          buttonText="View Wishlist"
          to="/favorites"
        />
        <Section
          title="My Cart"
          description="View and manage items in your cart."
          buttonText="Go to Cart"
          to="/cart"
        />
      </div>

      {/* Logout Button */}
      <button
        className="w-full mt-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200"
        onClick={() => logout()}
      >
        Log Out
      </button>
    </div>
  );
}

function Section({ title, description, buttonText, to }) {
  return (
    <section className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-xl font-medium text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
      <Link
        to={to}
        className="mt-4 inline-block px-4 py-2 text-blue-600 font-semibold hover:underline transition duration-150"
      >
        {buttonText}
      </Link>
    </section>
  );
}

export default MyProfile;
