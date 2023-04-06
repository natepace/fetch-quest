import * as React from "react";
import { Navigate } from "react-router-dom";
import { DogsList, Home } from "../features";
import { Login } from "../features/auth";

export const authRoutes = [
  {
    path: "dogs",
    element: <DogsList />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "login",
    element: <Login />,
  },
];
