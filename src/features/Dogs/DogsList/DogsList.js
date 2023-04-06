import axios from "axios";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Container } from "../../../components";
import { DogContext } from "../../../contexts/dogsContext";
import { DogBox } from "../DogBox";
import "./DogsList.scss";

const fetchKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s";
const apiHeaders = {
  headers: {
    "fetch-api-key": fetchKey,
  },
  withCredentials: true,
};
export function DogsList(props) {
  const [dogsArray, setDogsArray] = useState()
  const dogs = props.dogs;
  const ids = props.ids;
  console.log(ids)
  useEffect(()=>{
    axios
    .post(`https://frontend-take-home-service.fetch.com/dogs`,ids,apiHeaders)
    .then((res)=>{
      console.log(res.data)
      setDogsArray(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
    
  },[])

  if(!dogsArray){
    return(
      <h1>loading...</h1>
    )
  }
  return (
    <div className="DogsList">
 
      {dogsArray.map((dog,idx)=>{
        return(
        <DogBox dog={dog}/>
        )
        
      })}
    </div>
  );
}
