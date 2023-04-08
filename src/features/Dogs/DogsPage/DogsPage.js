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
