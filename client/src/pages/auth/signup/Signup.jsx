import axios from "axios";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../utils/axiosInstance";
import { FaGoogle, FaFacebook } from "react-icons/fa"; // Import icons
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { FaUserAlt } from "react-icons/fa";

function Signup() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  // Handle input changes
  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Password validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await api.post(`/api/v1/auth/create/user`, {
        userName,
        email,
        password,
      });

      if (response.status === 201) {
        toast.success("User registered successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("An error occurred during registration");
      console.error(error);
    } finally {
      if (response?.status === 201) {
        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md ">
      <Toaster />
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full transition-transform transform m-6 p-6">
        <form onSubmit={handleSubmit} className="w-full px-6 md:px-0">
          <div>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Create Your Account
              </h1>
            </div>
            <div className="space-y-4">
              <div className="form-field">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Username
                </label>
                <input
                  placeholder="Your username"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  value={userName}
                  onChange={handleChange(setUserName)}
                />
              </div>
              <div className="form-field">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  placeholder="Your email"
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  value={email}
                  onChange={handleChange(setEmail)}
                />
              </div>
              <div className="form-field relative">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Password
                </label>
                <div className=" flex">
                  <input
                    type={type}
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <span
                    className="absolute right-3 top-3 cursor-pointer"
                    onClick={handleToggle}
                  >
                    <Icon icon={icon} size={15} className="mt-6" />
                  </span>
                </div>
              </div>
              <div className="form-field relative">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Confirm Password
                </label>
                <div className="mb-4 flex">
                  <input
                    type={type}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="current-password"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <span
                    className="absolute right-3 top-3 cursor-pointer"
                    onClick={handleToggle}
                  >
                    <Icon icon={icon} size={15} className="mt-6" />
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg transition duration-150"
              >
                Sign Up
              </button>

              <p className="text-center text-sm text-gray-600 mt-6">
                Already have an account?{" "}
                <Link to="/login" className="text-indigo-500 hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
