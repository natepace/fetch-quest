import * as React from "react";
import { useState } from "react";
import axios from "axios";

const fetchURL = "https://frontend-take-home-service.fetch.com";
const fetchKey = process.env.apiFetchKey;
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
