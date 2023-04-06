import * as React from "react";
import { AppRoutes } from "../routes";
// import { ProtectedRoute } from "../routes/ProtectedRoute";

export function UserLayout() {
  let token = localStorage.getItem("fetch-access-token");
  return (
    // <ProtectedRoute>
    <AppRoutes />

    // </ProtectedRoute>
  );
}
