import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.VITE_BACKEND_URL || "https://logos-mart-server.onrender.com", // Use environment variable with a fallback
  withCredentials: true, // Include credentials such as cookies in requests
});

export default api;
