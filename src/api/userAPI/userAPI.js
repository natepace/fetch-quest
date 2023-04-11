import * as React from "react";
import axios from "axios";

const fetchURL = "https://frontend-take-home-service.fetch.com";
const fetchKey = process.env.apiFetchKey;

const GetDogBreeds = () => {
  return axios.get(fetchURL.concat("/dogs/breeds")).then((res) => {
    res.data;
  });
};
