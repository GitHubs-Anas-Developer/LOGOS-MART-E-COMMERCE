import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "../../../context/Auth";
import api from "../../../utils/axiosInstance";
import { FaGoogle, FaFacebook } from "react-icons/fa"; // Import icons
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { FaUserAlt } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

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

    try {
      const response = await api.post(`/api/v1/auth/user/login`, {
        email,
        password,
      });

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md animate-fade-in">
      <Toaster />
      <div className="bg-white p-10 rounded-lg shadow-xl max-w-sm w-full transition-transform transform  m-6">
        <div className="text-center mb-1">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2 ">
            Welcome Back!
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="w-full p-3">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email Address"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Password
            </label>
            <div>
              <div>
                <div class="mb-4 flex">
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
                    class="flex justify-around items-center"
                    onClick={handleToggle}
                  >
                    <Icon class="absolute mr-10" icon={icon} size={15} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="mr-2 rounded focus:ring-indigo-400"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="text-indigo-500 hover:underline text-sm"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md font-medium transition-all"
          >
            Login
          </button>

          <div className="flex justify-between items-center my-5">
            <hr className="w-full border-gray-300" />
            <span className="mx-2 text-gray-500 text-sm">or</span>
            <hr className="w-full border-gray-300" />
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                /* Handle Google login */
              }}
              className="flex justify-center items-center p-4 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md w-12 h-12 transition-all"
            >
              <FaGoogle size={24} />
            </button>
            <button
              onClick={() => {
                /* Handle Facebook login */
              }}
              className="flex justify-center items-center p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md w-12 h-12 transition-all"
            >
              <FaFacebook size={24} />
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-500 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
        <div></div>
      </div>
    </div>
  );
}

export default Login;
