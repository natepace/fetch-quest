import * as React from "react";
import { Route, Routes } from "react-router";
import { Nav } from "../components";
import { DogMatch,  DogsPage, Home, Login } from "../features";
import { ProtectedRoute } from "../routes/ProtectedRoute";
import { DogsProvider } from "../contexts/dogsContext";
export function AppLayout() {
 
  
  
  
  return (
    <div>
      <Routes>
        <Route
          path="/dogs"
          element={
            <ProtectedRoute>
              <DogsProvider>
                <Nav />
                <DogsPage />
              </DogsProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dogs/:id"
          element={
            <ProtectedRoute>
              <DogsProvider>
                <DogMatch />
              </DogsProvider>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      
    </div>
  );
}
