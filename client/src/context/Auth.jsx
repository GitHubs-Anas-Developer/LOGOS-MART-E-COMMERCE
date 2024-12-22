import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(Cookies.get("token") );

  const [userId, setUserId] = useState(null);
  useEffect(() => {
    // Sync the token with the cookie
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);

      Cookies.set("token", token, {
        expires: 1,
        secure: true,
      });
    } else {
      Cookies.remove("token");
    }
  }, [token]);

  const signup = (newToken) => {
    setToken(newToken);
    navigate("/");
  };

  const login = (newToken) => {
    setToken(newToken);
    navigate("/");
  };

  const logout = () => {
    setToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, signup, login, logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
