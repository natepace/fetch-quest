import * as React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { getGeoBox } from "../utils/geoBox";
const geolocation = require("geolocation");
const baseURL = "https://frontend-take-home-service.fetch.com";
const dogsSearch = "/dogs/search";
const locationsSearch = "/locations/search";
const dogsMatch = "/dogs/match";
const fetchKey = process.env.apiFetchKey;

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
  const [distance, setDistance] = useState();
  const [location, setLocation] = useState();
  const [hasLocation,setHasLocation]=useState()
  const [dogLocations, setDogLocations] = useState();
  const [nearIds, setNearIds] = useState([]);
  const [sortingBy, setSortingBy] = useState("name_desc")

  useEffect(() => {
    IDGrabber();
    geolocation.getCurrentPosition(function (err, position) {
      if (err) {
        setHasLocation(false)}
      
      setLocation({
        ...location,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, [searchParams,sortingBy]);

  const IDGrabber = () => {
    setLoading(true);
    
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

        
      )
      .then((res) => {
        

        setIds(res.data.resultIds);
       
        setNext(res.data.next);
        if (res.data.next) {
          setHasNext(true);
        }
       
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
        
        if (!res.data.prev) {
          
          setPrev(false)
        }
        if (res.data.next) {
          
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
       
        if (res.data.prev) {
         
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
       
        
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const DogMatcher = (favDogs) => {
    axios.post(`${baseURL}${dogsMatch}`, favDogs, apiHeaders).then((res) => {
     
      setMatch(res.data.match);
    });
  };

  const searchNearby = (location, num) => {
    const [latNorth, lonWest, latSouth, lonEast] = getGeoBox(
      location.latitude,
      location.longitude,
      num
    );
    
    const boxParams = {
      geoBoundingBox: {
        bottom_left: {
          lat: latSouth,
          lon: lonWest,
        },
        top_right: {
          lat: latNorth,
          lon: lonEast,
        },
      },
    };
    
    axios
      .post(`${baseURL}${locationsSearch}`, boxParams, apiHeaders)
      .then((res) => {
        

        DogLocationIdMapper(res.data.results);
      });
  };
  const DogLocationIdMapper = (locations) => {
    
    setLoading(true);

    locations.forEach((location) => {
      axios
        .get(`https://frontend-take-home-service.fetch.com/dogs/search`, {
          headers: {
            "fetch-api-key": fetchKey,
          },

          withCredentials: true,
          params: { zipCodes: location.zip_code },
        })
        .then((res) => {
          if (res.data.resultIds.length > 0) {
          
            res.data.resultIds.forEach((el) => {
            

              if (!nearIds.includes(el)) {
                let tempArr = nearIds;
                tempArr.push(el);

                setNearIds([...tempArr]);
              }
            });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    });

    setLoading(false);
  };
  const IdSetter = (arr) => {
    setIds(arr);
  };
  const ClearFavorites = () => {
    setFavIds([]);
  };

  const DogsSetter = (newDogs) => {
    setDogs(newDogs);
  };

  const ParamsBreedSetter = (newParams) => {
    
    if (newParams === "all") {
      setSearchParams({});
    } else {
      
      setLoading(true);
      searchParams.breeds = newParams.breed;
      setSearchParams({ ...searchParams });
      
      setLoading(false);
    }
  };

  const SetSorting = (sorting) => {
    setSortingBy(sorting)
  }
  if (isLoading) {
    return <></>;
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
        searchNearby,
        location,
        nearIds,
        IdSetter,
        setNearIds,
        setIds,
        hasLocation,
        sortingBy,
        SetSorting
      ]}
    >
      {children}
    </DogContext.Provider>
  );
};
