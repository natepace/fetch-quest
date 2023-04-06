import * as React from "react";
import { useContext, useEffect } from "react";
import { Container } from "../../../components";
import { DogContext } from "../../../contexts/dogsContext";
import { useDogsContext } from "../../../contexts/dogsContext";
import { DogsList } from "../DogsList";
import "./DogsPage.scss";
export function DogsPage() {
  //   const dogs = useContext(DogContext);
  const [dogs, dogsSetter] = useDogsContext();
  const GetDogs = async () => {
    const response = await dogsSetter();
    return response;
  };
  useEffect(() => {
    GetDogs();
  }, []);
  if (!dogs) {
    return <div>Loading...</div>;
  }

  // localStorage.removeItem("fetch-access-token");
  return (
    <div className="DogsList">
      {/* {dogs.map((dog, idx) => {
        return <h1 key={idx}>{dog}</h1>;
      })} */}
      <DogsList dogs={dogs} />
    </div>
  );
}
