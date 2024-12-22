import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../../../context/Auth";
import api from "../../../utils/axiosInstance";

function Login() {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post(
        `/api/v1/auth/user/login`,
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        toast.success("Logged in successfully");
        login(response.data.token); // Save token to cookie
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setError("Login failed. Please check your credentials.");
      toast.error(error.message || "Login failed.");
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
      <div className="">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-indigo-600">
            Login to Your Account
          </h1>
          <p className="text-gray-500">
            Welcome back! Please login to your account.
          </p>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>
        <form onSubmit={handleSubmit} className="w-full px-6 md:px-0">
          <div>
            <label className="block text-gray-200 text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-slate-800"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-200 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Your password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-slate-800"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-200">
              <input
                type="checkbox"
                className="mr-2 rounded text-blue-500 focus:ring-blue-400"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline text-sm"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-indigo-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition duration-150"
          >
            Login
          </button>
          <p className="text-center text-sm text-gray-200 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
