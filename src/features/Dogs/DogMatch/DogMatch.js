import * as React from "react";
import { useEffect, useState } from "react";
import { useDogsContext } from "../../../contexts/dogsContext";
import { Button } from "../../../components";
import { Navigate, useNavigate } from "react-router";
import { useParams } from "react-router";
import axios from "axios";
import "./DogMatch.scss";

const fetchKey = process.env.apiFetchKey;
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
    return <></>;
  }
 
  
  return (
    <div
      className="dogMatchPage"
      style={{ display: "flex", "justify-content": "center" }}
    >
      <div class="pyro">
        <div class="before"></div>
        <div class="after"></div>
      </div>
      
      <div
        className="dogMatch"
       
      >
        <div className="dogMatch-imgBox">
          <h1>Meet your Puppy!</h1>
          <p>if there is a person in the photo you do not get that person</p>
     
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
