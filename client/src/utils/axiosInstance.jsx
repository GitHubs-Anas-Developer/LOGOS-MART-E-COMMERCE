import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Use the environment variable
  withCredentials: true, // Required for sending cookies
});

export default api;
