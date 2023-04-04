import * as React from "react";
import { useRoutes } from "react-router-dom";

import { publicRoutes } from "./public";

export function AppRoutes() {
  //   const { user } = useAuth();
  let routes = publicRoutes;

  //if auth user

  let element = useRoutes(routes);

  return <>{element}</>;
}
