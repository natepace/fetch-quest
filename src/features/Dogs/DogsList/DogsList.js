import * as React from "react";
import { useContext } from "react";
import { Container } from "../../../components";
import { DogContext } from "../../../contexts/dogsContext";
import "./DogsList.scss";
export function DogsList(props) {
  const dogs = props.dogs;
  console.log(dogs);
  // if (!dogs) {
  //   return <div>Loading...</div>;
  // }
  // localStorage.removeItem("fetch-access-token");
  return (
    <div className="DogsList">
      {dogs.map((dog, idx) => {
        return <h1 key={idx}>{dog}</h1>;
      })}
    </div>
  );
}
