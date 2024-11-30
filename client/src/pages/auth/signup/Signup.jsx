import axios from "axios";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../../context/Auth";

function Signup() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return setPasswordError("Passwords do not match!");
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/create/user`,
        {
          userName,
          email,
          password,
        }
      );

      if (response.status === 201) {
        toast.success("User registered successfully");
        setIsModalOpen(false);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setServerError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
      toast.error(serverError);
    } finally {
      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPasswordError("");
      setServerError("");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-100"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <Toaster />
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <form onSubmit={handleSubmit} className="w-full px-6 md:px-0">
            <div className="">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold text-indigo-600">
                  Create Your Account
                </h1>
                <p className="text-gray-500">Sign up to get started</p>
                {passwordError && (
                  <p className="text-red-600 text-sm mt-2">{passwordError}</p>
                )}
                {serverError && (
                  <p className="text-red-600 text-sm mt-2">{serverError}</p>
                )}
              </div>
              <div className="space-y-4">
                <div className="form-field">
                  <label className="block text-gray-200 text-sm font-medium mb-1">
                    Username
                  </label>
                  <input
                    placeholder="Your username"
                    type="text"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-slate-800"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label className="block text-gray-200 text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    placeholder="Your email"
                    type="email"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-slate-800"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label className="block text-gray-200 text-sm font-medium mb-1">
                    Password
                  </label>
                  <input
                    placeholder="Your password"
                    type="password"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-slate-800"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label className="block text-gray-200 text-sm font-medium mb-1">
                    Confirm Password
                  </label>
                  <input
                    placeholder="Confirm your password"
                    type="password"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-slate-800"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm text-gray-200">
                    <input
                      type="checkbox"
                      className="mr-2 rounded text-indigo-500 focus:ring-indigo-400"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    Remember me
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-indigo-500 hover:underline text-sm"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg transition duration-150"
                >
                  Sign Up
                </button>
                <p className="text-center text-sm text-gray-200 mt-4">
                  Already have an account?{" "}
                  <Link to="/login" className="text-indigo-500 hover:underline">
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Signup;
