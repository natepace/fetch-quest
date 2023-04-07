import * as React from "react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Container } from "../../../components";
import { DogContext } from "../../../contexts/dogsContext";
import { useDogsContext } from "../../../contexts/dogsContext";
import { DogsList } from "../DogsList";
import "./DogsPage.scss";

const baseURL = "https://frontend-take-home-service.fetch.com";
const dogsBreeds = "/dogs/breeds";
const fetchKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s";

const apiHeaders = {
  headers: {
    "fetch-api-key": fetchKey,
  },

  withCredentials: true,
};
export function DogsPage() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [breeds, setBreeds] = useState();
  const [isLoading, setLoading] = useState(true);
  const [option, setOption] = useState("all");
  const [
    dogs,
    DogsSetter,
    ids,
    NextPage,
    PrevPage,
    hasNext,
    hasPrev,
    searchParams,
    ParamsBreedSetter,
  ] = useDogsContext();
  useEffect(() => {
    axios
      .get(`${baseURL}${dogsBreeds}`, apiHeaders)
      .then((res) => {
        setBreeds(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
    if (searchParams.breeds) {
      setOption(searchParams.breeds);
    }
  }, []);

  const selectChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.value === "all") {
      setOption("all");
      ParamsBreedSetter("all");
    } else {
      ParamsBreedSetter({ breed: e.target.value });
    }
  };

  if (isLoading) {
    return <div className="app">Loading...</div>;
  }
  return (
    <div className="DogsList">
      <h1>still working dogpage</h1>
      <select onChange={selectChange} value={searchParams.breeds}>
        <option value={"all"}>All Breeds</option>
        {breeds.map((breed) => {
          return <option value={breed}>{breed}</option>;
        })}
      </select>
      <DogsList />
      {hasPrev ? (
        <Button onClick={PrevPage}>PREV</Button>
      ) : (
        <Button>PREV</Button>
      )}
      {hasNext ? (
        <Button onClick={NextPage}>NEXT</Button>
      ) : (
        <Button>NEXT</Button>
      )}
    </div>
  );
}
