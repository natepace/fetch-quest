import * as React from "react";
import { useState } from "react";
import axios from "axios";

const fetchURL = "https://frontend-take-home-service.fetch.com";
const fetchKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s";
const apiHeaders = {
  headers: {
    "fetch-api-key": fetchKey,
  },
  withCredentials: true,
};

export const GetDogBreeds = () => {
  const [dogs, setDogs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  axios.get(fetchURL.concat("/dogs/breeds"), apiHeaders).then((res) => {
    setDogs(res.data);
    setLoading(false);
  });
};
