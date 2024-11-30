import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./Auth";
import api from "../utils/axiosInstance";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const { userId } = useContext(AuthContext);

  const fetchUser = async () => {
    if (!userId) return; // Return if userId is not available

    try {
      const response = await api.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/user/${userId}`
      );
      setUser(response.data.user); // Set user state with fetched data
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser(); // Call fetchUser when component mounts or userId changes
  }, [userId]); // Dependency on userId

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserContext;
