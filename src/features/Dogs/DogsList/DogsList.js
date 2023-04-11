import axios from "axios";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Container } from "../../../components";
import { useDogsContext } from "../../../contexts/dogsContext";
import { DogBox } from "../DogBox";
import "./DogsList.scss";

const fetchKey = process.env.apiFetchKey;
const headersOnly = {
  headers: {
    "fetch-api-key": fetchKey,
  },

  withCredentials: true,
};
export function DogsList() {
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
    match,
    searchNearby,
    location,
    nearIds,
    IdSetter,
    setNearIds,
    setIds,
    hasLocation,
    sortingBy,
    setSortingBy,
  ] = useDogsContext();
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
        
        
        if(sortingBy==="name_desc"){
          let sorted = res.data.sort((a, b) => a.name.localeCompare(b.name)); 
          DogsSetter(sorted);
          setLoading(false);
        }
        else if(sortingBy==="name_asc"){
          let sorted = res.data.sort((a, b) => a.name.localeCompare(b.name)); 
          let reversed = sorted.reverse()
          DogsSetter(reversed);
          setLoading(false);
        }
        else if(sortingBy==="age_desc"){
          let sorted = res.data.sort((a, b) =>b.age-a.age); 
          DogsSetter(sorted);
          setLoading(false);
        }
        else if(sortingBy==="age_asc"){
          let sorted = res.data.sort((a, b) =>a.age-b.age); 
          DogsSetter(sorted);
          setLoading(false);
        }
        else{
        DogsSetter(res.data)
        setLoading(false);
        }
       

       
      })
      .catch((err) => {
        console.log(err.message);
      });
    // };
  }, [ids]);

  if (isLoading) {
    return <div className="app" style={{"text-align":"center"}}><h3>Loading...</h3></div>;
  }

  return (
    <div className="DogsList">
      {dogs.map((dog, idx) => {
        
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
