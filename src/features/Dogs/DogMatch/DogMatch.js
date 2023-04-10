import * as React from "react";
import { useEffect, useState } from "react";
import { useDogsContext } from "../../../contexts/dogsContext";
import { Button } from "../../../components";
import { Navigate, useNavigate } from "react-router";
import { useParams } from "react-router";
import axios from "axios";
import "./DogMatch.scss";

const fetchKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s";
const headersOnly = {
  headers: {
    "fetch-api-key": fetchKey,
  },

  withCredentials: true,
};

export function DogMatch() {
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
    favIds,
    setFavIds,
    DogMatcher,
    ClearFavorites,
  ] = useDogsContext();
  const [isLoading, setLoading] = useState(true);
  const matchId = useParams().id;
  const Navigate = useNavigate();
  useEffect(() => {
    console.log(matchId);
    axios
      .post(
        `https://frontend-take-home-service.fetch.com/dogs`,
        [matchId],
        headersOnly
      )
      .then((res) => {
        console.log(res.data);
        DogsSetter(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
    // };
  }, []);

  const goBack = () => {
    Navigate("/dogs");
  };

  if (isLoading) {
    return <div className="app">Loading...</div>;
  }
  // console.log(useParams().id);
  console.log(dogs);
  return (
    <div
      className="dogMatchPage"
      style={{ display: "flex", "justify-content": "center" }}
    >
      <div class="pyro">
        <div class="before"></div>
        <div class="after"></div>
      </div>
      {/* dog match
      <h1>its loading your dog {dogs[0].name}!</h1> */}
      <div
        className="dogMatch"
        // style={{ transform: `${randomRotate()}` }}
        // onClick={() => {
        //   favSetter(dog.id);
        // }}
      >
        <div className="dogMatch-imgBox">
          <h1>Meet your Puppy!</h1>
          <p>if there is a person in the photo you do not get that person</p>
          {/* {favIds.some(function (item) {
          return item === dog.id;
        }) ? (
          <div className="dogMatch-imgBox--favorite">
            <img src={starImg} id="star" />
          </div>
        ) : (
          <></>
        )} */}
          <img src={dogs[0].img} alt="dog" />
        </div>

        <h2>{dogs[0].name}</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <div className="dogMatch-textBox">
          <div className="dogMatch-textBox--divider">
            <p>Breed:</p>
            <p>{dogs[0].breed}</p>
          </div>
          <div className="dogMatch-textBox--divider">
            <p>Age:</p>
            <p>{dogs[0].age}</p>
          </div>
          <div className="dogMatch-textBox--divider">
            <p>Zip-code:</p>
            <p>{dogs[0].zip_code}</p>
          </div>
        </div>
        <Button raised onClick={goBack}>
          Go Back!
        </Button>
      </div>
    </div>
  );
}
