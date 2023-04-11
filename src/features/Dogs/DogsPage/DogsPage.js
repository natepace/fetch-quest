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
  const setGeoBox = (e) => {
    // console.log(e.target.value);
    e.preventDefault();
    setNearIds([]);
    // setIds([]);
    setNearMe(true);

    // DistanceSetter(e.target.value);

    searchNearby(location, e.target.value);
  };

  if (isLoading) {
    return <div className="app">Loading...</div>;
  }
  return (
    <div className="dogsPage">
      <div className="dogsPage-header">
        <div>
          <h1>Welcome to the Dogs Page</h1>
          <p>I Chose this font because its Called 'Underdog'</p>
        </div>
      </div>
      <div className="dogsPage-filters">
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

        {nearMe ? (
          <></>
        ) : (
          <select onChange={setGeoBox}>
            <option value="" selected disabled hidden>
              Select Area
            </option>
            <option value={25}>25 miles</option>
            <option value={50}>50 miles</option>
            <option value={75}>75 miles</option>
            {/* <option value={100}>100 miles</option>  */}
            {/* <option value={200}>200 miles</option> */}
          </select>
        )}

        {/* <Button raised onClick={setGeoBox}>
          Search This Area
        </Button> */}
        {nearMe ? (
          <button
            onClick={() => {
              IdSetter(nearIds);
              setNearIds([]);
              setNearMe(false);
            }}
          >
            Filter
          </button>
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
        <Button
          raised
          // onClick={() => {
          //   DogMatcher(favIds);
          // }}
          onClick={() => setToggleMatchModal(true)}
        >
          Find My Match!
        </Button>
      </div>

      <div className="dogsPage-pageButtonsWrapper">
        <div className="dogsPage-pageButtons">
          {hasPrev ? (
            <Button raised onClick={PrevPage}>
              PREV PAGE
            </Button>
          ) : (
            <Button raised>PREV PAGE</Button>
          )}
          {hasNext ? (
            <Button raised onClick={NextPage}>
              NEXT PAGE
            </Button>
          ) : (
            <Button raised>NEXT PAGE</Button>
          )}
        </div>
      </div>

      <div className="dogsPage-container">
        <DogsList />
      </div>
      <div className="dogsPage-pageButtonsWrapper">
        <div className="dogsPage-pageButtons">
          {hasPrev ? (
            <Button raised onClick={PrevPage}>
              PREV PAGE
            </Button>
          ) : (
            <Button raised>PREV PAGE</Button>
          )}
          {hasNext ? (
            <Button raised onClick={NextPage}>
              NEXT PAGE
            </Button>
          ) : (
            <Button raised>NEXT PAGE</Button>
          )}
        </div>
      </div>
      <MatchModal
        isOpen={toggleMatchModal}
        onClose={() => {
          setToggleMatchModal(false);
        }}

        // callback={(val) => {
        //   createAccountContact({
        //     variables: {
        //       id: accountId,
        //       updates: {
        //         name: val.name,
        //         title: val.title,
        //         email: val.email,
        //         phone: val.phone,
        //         primary: val.primary,
        //         sendInvoices: val.sendInvoices,
        //       },
        //     },
        //     refetchQueries: [
        //       {
        //         query: ACCOUNT_QUERY,
        //         variables: {
        //           id: accountId,
        //         },
        //       },
        //     ],
        //   });
        // }}
      />
    </div>
  );
}
