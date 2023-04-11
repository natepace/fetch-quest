import * as React from "react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Container } from "../../../components";
import { DogContext } from "../../../contexts/dogsContext";
import { useDogsContext } from "../../../contexts/dogsContext";
import { DogsList } from "../DogsList";
import { MatchModal } from "../../MatchModal/MatchModal";
import "./DogsPage.scss";

const baseURL = "https://frontend-take-home-service.fetch.com";
const dogsBreeds = "/dogs/breeds";
const fetchKey = process.env.apiFetchKey;

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
  const [nearMe, setNearMe] = useState(false);
  const [selectedArea, setSelectedArea] = useState(false);
  const [seeingLocal, setSeeingLocal] = useState(false)
  const [toggleMatchModal, setToggleMatchModal] = useState(false);
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
    SetSorting
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
    
    if (e.target.value === "all") {
      setOption("all");
      ParamsBreedSetter("all");
    } else {
      ParamsBreedSetter({ breed: e.target.value });
    }
  };
  const sortSelectChange = (e) => {
    e.preventDefault()
    SetSorting(e.target.value)
  }
  const setGeoBox = (e) => {
    
    e.preventDefault();
    setNearIds([]);
    
    setNearMe(true);

   

    searchNearby(location, e.target.value);
  };
const goToNext = () => {

NextPage()
}
  if (isLoading) {
    return <></>;
  }
  
  return (
    <div className="dogsPageWrapper">
    <div className="dogsPage">
      <div className="dogsPage-header">
        <div>
          <h1>Welcome to the Dogs Page</h1>
          <p>I Chose this font because its Called 'Underdog'</p>
        </div>
      </div>
      <div className="dogsPage-filters">
        <div className="dogsPage-filters--labelFilter">
            <label>Choose a Breed</label>
        <select onChange={selectChange} value={searchParams.breeds}>
          <option value={"all"}>All Breeds</option>
          {breeds.map((breed, idx) => {
            return (
              <option value={breed} key={idx}>
                {breed}
              </option>
            );
          })}
        </select>
        </div>
        {!seeingLocal && (
          <div className="dogsPage-filters--labelFilter">
          <label>Sort Other Ways</label>
        <select onChange={sortSelectChange} >
        <option value="" selected disabled hidden>
              Sort by
            </option>
          <option value={"name_desc"}>Name, desc..</option>
          <option value={"name_asc"}>Name, asc..</option>
          <option value={"age_desc"}>Age, desc..</option>
          <option value={"age_asc"}>Age, asc..</option>
          
          
        </select>
        </div>
        )}
        
        {seeingLocal && (
           <div className="dogsPage-filters--labelFilter">
           <label>See All Dogs</label>
          <Button raised
            onClick={() => {
             
              setOption("all");
              ParamsBreedSetter("all");
            }}
          >
            Go Back
          </Button>
          </div>
        ) }
        {nearMe ? (
          <></>
        ) : (
          <div className="dogsPage-filters--labelFilter">
            <label>Find Dogs in Your Area</label>
          <select onChange={setGeoBox}>
            <option value="" selected disabled hidden>
              Select Area
            </option>
            <option value={25}>25 miles</option>
            <option value={50}>50 miles</option>
            <option value={75}>75 miles</option>
           
          </select>
          </div>
        )}

        
        {nearMe ? (
           <div className="dogsPage-filters--labelFilter">
           <label>Find Dogs in Your Area</label>
          <Button raised
            onClick={() => {
              IdSetter(nearIds);
              setNearIds([]);
              setNearMe(false);
              setSeeingLocal(true)
            }}
          >
            Find Dogs Near Me!
          </Button>
          </div>
        ) : (
          <></>
        )}
    
      </div>
      <div className="dogsPage-filters">
        <Button
          raised
          onClick={() => {
            ClearFavorites();
          }}
        >
          Clear Favorites
        </Button>
        {favIds.length > 0 && (
           <Button
          raised
          
          onClick={() => setToggleMatchModal(true)}
        >
          Find My Match!
        </Button>
        )}
        {favIds.length === 0 && (
           <Button
          raised
          // disabled
          
         
        >
          Select Favorites!
        </Button>
        )}
       
      </div>

      <div className="dogsPage-pageButtonsWrapper">
        {!seeingLocal && (
            <div className="dogsPage-pageButtons">
          {hasPrev ? (
            <Button raised onClick={PrevPage}>
              PREV PAGE
            </Button>
          ) : (
            <Button raised>PREV PAGE</Button>
          )}
          {hasNext ? (
            <Button raised onClick={goToNext}>
              NEXT PAGE
            </Button>
          ) : (
            <Button raised>NEXT PAGE</Button>
          )}
        </div>
        )}
      
      </div>

      <div className="dogsPage-container">
        <h3>Click on a card below to add it to your favorites!</h3>
        <h4>When you are done, select your dog by clicking Find My Match above!</h4>
        <DogsList />
      </div>
      <div className="dogsPage-pageButtonsWrapper">
      {!seeingLocal && (
            <div className="dogsPage-pageButtons">
          {hasPrev ? (
            <Button raised onClick={PrevPage}>
              PREV PAGE
            </Button>
          ) : (
            <Button raised>PREV PAGE</Button>
          )}
          {hasNext ? (
            <Button raised onClick={goToNext}>
              NEXT PAGE
            </Button>
          ) : (
            <Button raised>NEXT PAGE</Button>
          )}
        </div>
        )}
      </div>
      <MatchModal
        isOpen={toggleMatchModal}
        onClose={() => {
          setToggleMatchModal(false);
        }}

     
      />
    </div>
    </div>
  );
}
