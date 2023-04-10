import axios from "axios";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Container } from "../../../components";
import { useDogsContext } from "../../../contexts/dogsContext";
import { DogBox } from "../DogBox";
import "./DogsList.scss";

const fetchKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s";
const headersOnly = {
  headers: {
    "fetch-api-key": fetchKey,
  },

  withCredentials: true,
};
export function DogsList() {
  const [dogs, DogsSetter, ids] = useDogsContext();
  const [isLoading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    axios
      .post(
        `https://frontend-take-home-service.fetch.com/dogs`,
        ids,
        headersOnly
      )
      .then((res) => {
        // console.log(res.data);
        DogsSetter(res.data);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
    // };
  }, []);

  if (isLoading) {
    return <div className="app">Loading...</div>;
  }

  return (
    <div className="DogsList">
      {dogs.map((dog, idx) => {
        console.log(dog.zip_code);
        return (
          <DogBox
            dog={dog}
            key={idx}
            setFavorites={setFavorites}
            favorites={favorites}
          />
        );
      })}
    </div>
  );
}
