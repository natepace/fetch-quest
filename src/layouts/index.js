import * as React from "react";
import { AppRoutes } from "../routes/index";

export function AppLayout() {
  //   const { user } = useAuth();
  console.log("hi from applayout");
  return (
    <div className="app">
      <AppRoutes />
    </div>
  );
}
