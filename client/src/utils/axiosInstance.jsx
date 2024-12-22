import axios from "axios";

const api = axios.create({
  baseURL: "https://logos-mart-server.onrender.com", // Dynamically sets the backend URL
  withCredentials: true, // Ensures cookies are sent with requests
});

export default api;
