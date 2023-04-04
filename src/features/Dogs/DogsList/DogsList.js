import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "../../../components";

export function DogsList() {
  const [dogs, setDogs] = useState([]);
  const [dogImg, setDogImg] = useState();
  const [isLoading, setLoading] = useState(true);
  //   if (!dogs) {
  //     return;
  //   }
  useEffect(() => {
    // const handleClicky = () => {
    axios
      .get(`https://frontend-take-home-service.fetch.com/dogs/breeds`, {
        headers: {
          "fetch-api-key":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s",
        },
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res);
        setDogs(res.data);
        setLoading(false);
      });
    // };
  }, []);

  //   console.log(dogs);
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  return (
    <div>
      {/* <h1>{dogs[0].name}</h1> */}
      {/* <h1>dog</h1> */}
      {dogs.map((dog) => {
        // key = idx;
        // console.log(dog);
        // axios
        //   .get(`https://dog.ceo/api/breed/${dog.toLowerCase()}/images/random`)
        //   .then((res) => {
        //     setDogImg(res.message);
        //     console.log(dogImg);
        //   });
        let imgSrc = `https:\/\/images.dog.ceo\/breeds\/${dog.toLowerCase()}\/n02110627_641.jpg`;
        console.log(imgSrc);
        return (
          <>
            <h1>{dog}</h1>
            {/* <img src={dogImg} /> */}
            {/* <img src={imgSrc} /> */}
            {/* <img src="https:\/\/images.dog.ceo\/breeds\/affenpinscher\/n02110627_641.jpg" /> */}
          </>
        );
      })}
    </div>
  );
}
