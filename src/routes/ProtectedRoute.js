import * as React from "react";
import { Navigate } from "react-router-dom";
// import { Login } from "../features/auth";
import { useUserContext } from "../contexts/userContext";
export const ProtectedRoute = ({ children }) => {
  const [user, userToken] = useUserContext();
  //   console.log(element);
  console.log(userToken);
  if (!userToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};
