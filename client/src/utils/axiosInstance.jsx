import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8050", // Dynamically sets the backend URL
  withCredentials: true, // Ensures cookies are sent with requests
});


export default api;
