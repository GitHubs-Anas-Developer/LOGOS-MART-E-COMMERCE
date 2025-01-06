import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "https://logos-mart-e-commerce.onrender.com", // Use environment variable with a fallback
  withCredentials: true, // Include credentials such as cookies in requests
});

export default api;
