// src/components/ProtectedRoute.js
import React, { useContext } from "react";
import { AuthContext } from "../../context/Auth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  // If there is no token, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If there is a token, render the children (protected content)
  return children;
};

export default ProtectedRoute;
