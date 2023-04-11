import * as React from "react";
import { useEffect, useState } from "react";
import { useDogsContext } from "../../../contexts/dogsContext";
import starImg from "../../../assets/star.png";
import "./DogBox.scss";
export function DogBox(props) {
  const dog = props.dog;
  const favorites = props.favorites;
  const setFavorites = props.setFavorites;
  const tempArr = favorites;
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
  ] = useDogsContext();

  function randomRotate() {
    const deg = Math.random() * (5 - -5) + -5;
    return "rotate(" + deg + "deg)";
  }
  const favSetter = (id) => {
    setFavIds((prevFavorites) => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter((favorite) => favorite !== id);
      } else {
        return [...prevFavorites, id];
      }
    });
  };
  return (
    <div
      className="dogBox"
      style={{ transform: `${randomRotate()}` }}
      onClick={() => {
        favSetter(dog.id);
      }}
    >
      <div className="dogBox-imgBox">
        {favIds.some(function (item) {
          return item === dog.id;
        }) ? (
          <div className="dogBox-imgBox--favorite">
            <img src={starImg} id="star" />
          </div>
        ) : (
          <></>
        )}
        <img src={dog.img} alt="dog" />
      </div>

      <h2>{dog.name}</h2>
      <div className="dogBox-textBox">
        <div className="dogBox-textBox--divider">
          <p>Breed:</p>
          <p>{dog.breed}</p>
        </div>
        <div className="dogBox-textBox--divider">
          <p>Age:</p>
          <p>{dog.age}</p>
        </div>
        <div className="dogBox-textBox--divider">
          <p>Zip-code:</p>
          <p>{dog.zip_code}</p>
        </div>
      </div>
    </div>
  );
}
