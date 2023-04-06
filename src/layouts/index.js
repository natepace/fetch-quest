import * as React from "react";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import { Nav } from "../components";
import { DogsList, DogsPage, Home, Login } from "../features";
import { useUserContext } from "../contexts/userContext";
import { AppRoutes } from "../routes/index";
import { ProtectedRoute } from "../routes/ProtectedRoute";
export function AppLayout() {
  //   const { user } = useAuth();
  console.log("hi from applayout");
  const [user, userToken, updateUser] = useUserContext();
  // const [token, setToken] = useState(false);
  // useEffect(() => {
  //   if (localStorage.getItem("fetch-access-token")) {
  //     setToken(true);
  //   }
  // }, [userToken]);
  return (
    <div>
      <Routes>
        <Route
          path="/dogs"
          element={
            <ProtectedRoute>
              <Nav />
              <DogsPage />
            </ProtectedRoute>
          }
        />
        {/* <ProtectedRoute>
          <Route path="/dogs" element={DogsList} />
        </ProtectedRoute> */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {/* <AppRoutes /> */}
    </div>
  );
}
