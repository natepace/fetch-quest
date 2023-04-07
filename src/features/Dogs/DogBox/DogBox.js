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
  
  function randomRotate() {
     const deg = Math.random() * (5 - -5) + -5;
     return 'rotate(' + deg + 'deg)';
     }
  return (
    <div className="dogBox" style={{"transform":`${randomRotate()}`}}>
      <div className="dogBox-imgBox">
        <img src={dog.img} alt="dog" />
      </div>
    
      <h2>{dog.name}</h2>
      <div className="dogBox-textBox">
        <div className="dogBox-textBox--divider">
          <p>Breed:</p><p>{dog.breed}</p>
        </div>
        <div className="dogBox-textBox--divider">
          <p>Age:</p><p>{dog.age}</p>
        </div>
        <div className="dogBox-textBox--divider">
          <p>Zip-code:</p><p>{dog.zip_code}</p>
        </div>
      
      </div>
      

      {/* <h1>still working dogbox</h1> */}
    </div>
  );
}
