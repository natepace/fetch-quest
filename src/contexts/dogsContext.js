import * as React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const baseURL = "https://frontend-take-home-service.fetch.com";
const dogsSearch = "/dogs/search";
const dogsMatch = "/dogs/match";
const fetchKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s";

const apiHeaders = {
  headers: {
    "fetch-api-key": fetchKey,
  },

  withCredentials: true,
};
const apiParams = {};

export const DogContext = createContext(null);

export function useDogsContext() {
  return useContext(DogContext);
}

export const DogsProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState(apiParams);
  const [ids, setIds] = useState();
  const [dogs, setDogs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [next, setNext] = useState();
  const [prev, setPrev] = useState();
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState();
  const [favIds, setFavIds] = useState([]);
  const [match, setMatch] = useState();

  useEffect(() => {
    IDGrabber();
  }, [searchParams]);

  const IDGrabber = () => {
    setLoading(true);
    console.log(searchParams);
    console.log(ids);
    axios
      .get(
        `https://frontend-take-home-service.fetch.com/dogs/search`,
        {
          headers: {
            "fetch-api-key": fetchKey,
          },

          withCredentials: true,
          params: searchParams,
        }

        // apiHeaders,
        // searchParams
      )
      .then((res) => {
        // console.log(res.data);

        setIds(res.data.resultIds);
        console.log(res.data.resultIds);
        setNext(res.data.next);
        if (res.data.next) {
          setHasNext(true);
        }
        // console.log(ids);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });

    return ids;
  };
  const NextPage = () => {
    setLoading(true);
    axios
      .get(
        `${baseURL}${next}`,

        apiHeaders,
        searchParams
      )
      .then((res) => {
        console.log(res.data);
        if (!res.data.prev) {
          console.log("null");
        }
        if (res.data.next) {
          // console.log("null");
          setNext(res.data.next);
        }
        if (!res.data.next) {
          setHasNext(false);
        }
        if (res.data.prev) {
          setHasPrev(true);
        }
        setIds(res.data.resultIds);

        setPrev(res.data.prev);
        console.log(hasPrev);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const PrevPage = () => {
    setLoading(true);
    axios
      .get(
        `${baseURL}${prev}`,

        apiHeaders,
        searchParams
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.prev) {
          // console.log("null");
          setPrev(res.data.prev);
        }
        if (!res.data.prev) {
          setHasPrev(false);
        }
        if (res.data.prev) {
          setHasPrev(true);
        }
        setIds(res.data.resultIds);
        setNext(res.data.next);
        // setPrev(res.data.prev);
        console.log(hasPrev);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const DogMatcher = (favDogs) => {
    axios.post(`${baseURL}${dogsMatch}`, favDogs, apiHeaders).then((res) => {
      console.log(res.data.match);
      setMatch(res.data.match);
    });
  };
  const ClearFavorites = () => {
    setFavIds([]);
  };

  const DogsSetter = (newDogs) => {
    setDogs(newDogs);
  };

  const ParamsBreedSetter = (newParams) => {
    console.log(newParams);
    if (newParams === "all") {
      setSearchParams({});
    } else {
      console.log(searchParams);
      setLoading(true);
      searchParams.breeds = newParams.breed;
      setSearchParams({ ...searchParams });
      console.log(searchParams);
      setLoading(false);
    }
  };

  // const FavoritesSetter = (favDog) => {

  // };

  if (isLoading) {
    return <div className="app">Loading...</div>;
  }
  return (
    <DogContext.Provider
      value={[
        dogs,
        DogsSetter,
        ids,
        NextPage,
        PrevPage,
        hasNext,
        hasPrev,
        searchParams,
        ParamsBreedSetter,
        favIds,
        setFavIds,
        DogMatcher,
        ClearFavorites,
        match,
      ]}
    >
      {children}
    </DogContext.Provider>
  );
};
