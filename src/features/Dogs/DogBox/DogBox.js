import * as React from "react";
import { useContext } from "react";
import { Container } from "../../../components";
import { DogContext } from "../../../contexts/dogsContext";
import "./DogBox.scss";
export function DogBox(props) {
  const dog = props.dog;
  //   const ids = props.ids;
  // console.log(dogs);
  // if (!dogs) {
  //   return <div>Loading...</div>;
  // }
  // localStorage.removeItem("fetch-access-token");
  return (
    <div className="dogBox">
      <div className="dogBox-imgBox">
        <img src={dog.img} alt="dog" />
      </div>

      <p>{dog.name}</p>
      <p>{dog.breed}</p>
      <p>{dog.age}</p>
      <p>{dog.zip_code}</p>

      {/* <h1>still working dogbox</h1> */}
    </div>
  );
}
