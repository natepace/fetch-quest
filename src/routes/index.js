import * as React from "react";
import { useState, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { authRoutes } from "./authRoutes";
import { publicRoutes } from "./public";

export function AppRoutes() {
  const [token, setToken] = useState(false);
  const [routes, setRoutes] = useState(publicRoutes);
  //   const { user } = useAuth();
  useEffect(() => {
    if (localStorage.getItem("fetch-access-token")) {
      setToken(true);
    }

    if (token) {
      setRoutes(authRoutes);
    }
  }, []);
  // let token = localStorage.getItem("fetch-access-token");
  // let routes = publicRoutes;
  // let routes = [];
  //if auth user
  // if (token) {
  //   routes = authRoutes;
  // } else {
  //   routes = publicRoutes;
  // }

  let element = useRoutes(routes);

  return <>{element}</>;
}
