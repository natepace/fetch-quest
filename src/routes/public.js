import * as React from "react";
import { Navigate } from "react-router-dom";
import { Login } from "../features/";
import { Home } from "../features/";
import { DogsList } from "../features/";
// import { ForgotPassword, Login, ResetPassword } from '~/src/features/auth';

export const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "dogs",
    element: <Navigate to="/login" />,
  },
];
