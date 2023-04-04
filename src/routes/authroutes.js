import * as React from "react";
import { Navigate } from "react-router-dom";
import { Login } from "../features/auth";

export const authroutes = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];
