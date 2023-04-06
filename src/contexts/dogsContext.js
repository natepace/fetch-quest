import * as React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const fetchURL = "https://frontend-take-home-service.fetch.com/dogs/breeds";
const fetchKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s";
const apiHeaders = {
  headers: {
    "fetch-api-key": fetchKey,
  },
  withCredentials: true,
};

export const DogContext = createContext(null);

export function useDogsContext() {
  return useContext(DogContext);
}

export const DogsProvider = ({ children }) => {
  const [dogs, setDogs] = useState();

  function dogSetter() {
    console.log("hi from dogcontext");
    axios
      .get(fetchURL, apiHeaders)
      .then((res) => {
        setDogs(res.data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // useEffect(() => {
  //   axios
  //     .get(fetchURL, apiHeaders)
  //     .then((res) => {
  //       setDogs(res.data);
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <DogContext.Provider value={[dogs, dogSetter]}>
      {children}
    </DogContext.Provider>
  );
};
