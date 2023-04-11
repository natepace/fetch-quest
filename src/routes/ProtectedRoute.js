import * as React from "react";
import { Navigate } from "react-router-dom";

import { useUserContext } from "../contexts/userContext";
export const ProtectedRoute = ({ children }) => {
  const [user, userToken] = useUserContext();
  
  
  if (!userToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};
