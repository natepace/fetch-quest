import * as React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router";
import axios from "axios";

const fetchURL = "https://frontend-take-home-service.fetch.com/auth/login";
const fetchKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s";
const apiHeaders = {
  headers: {
    "fetch-api-key": fetchKey,
  },
  withCredentials: true,
};

export const UserContext = createContext(null);

const defaultUser = {
  name: "",
  email: "",
};
export function useUserContext() {
  return useContext(UserContext);
}
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);
  const [userToken, setUserToken] = useState(false);

  const updateUser = async (newUser) => {
    if (newUser === null) {
      setUser(newUser);
      setUserToken(false);
      console.log("logged out");
      return;
    } else {
      const response = await axios.post(
        `https://frontend-take-home-service.fetch.com/auth/login`,
        newUser,
        apiHeaders
      );
      setUser(newUser);
      setUserToken(true);
      console.log(user);
      console.log(response);
      return response.data;
    }
  };

  return (
    <UserContext.Provider value={[user, userToken, updateUser]}>
      {children}
    </UserContext.Provider>
  );
};
