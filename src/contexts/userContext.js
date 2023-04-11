import * as React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router";
import axios from "axios";

const fetchURL = "https://frontend-take-home-service.fetch.com/auth/login";
const fetchKey = process.env.apiFetchKey;
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
      
      return;
    } else {
      const response = await axios.post(
        `https://frontend-take-home-service.fetch.com/auth/login`,
        newUser,
        apiHeaders
      );
      setUser(newUser);
      setUserToken(true);
     
      return response.data;
    }
  };

  return (
    <UserContext.Provider value={[user, userToken, updateUser]}>
      {children}
    </UserContext.Provider>
  );
};
