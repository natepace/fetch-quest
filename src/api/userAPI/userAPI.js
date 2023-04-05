import * as React from "react";
import axios from "axios";

const fetchURL = "https://frontend-take-home-service.fetch.com";
const fetchKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s";

const GetDogBreeds = () => {
  return axios.get(fetchURL.concat("/dogs/breeds")).then((res) => {
    res.data;
  });
};
