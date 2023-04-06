import * as React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const fetchURL = "https://frontend-take-home-service.fetch.com/dogs/breeds";
const fetchKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s";
const apiHeaders = {
  headers: {
    "fetch-api-key": fetchKey,
  },
  withCredentials: true,
};

export const DogContext = createContext(null);

export function useDogsContext() {
  return useContext(DogContext);
}

export const DogsProvider = ({ children }) => {
  const [dogs, setDogs] = useState();
  const [nodes, setNodes] = useState([])
  const [ids, setIds] = useState([])
  useEffect(()=>{
    dogSetter()
    idGrabber()
  },[])
  // ?size=10000
const idGrabber = async () => {
  const response = await axios
  .get(`https://frontend-take-home-service.fetch.com/dogs/search?size=10`, apiHeaders)
  setIds(response.data.resultIds)
  console.log(response)
  return ids
}
  const dogSetter = async () => {
    console.log("hi from dogcontext");
    const response = await axios
      .get(fetchURL, apiHeaders)
      // .then((res) => {
      //   // setDogs(res.data);
      //   console.log(res.data.slice(((pageSize*page)),pageSize))
      //   setDogs(res.data.slice(((pageSize*page)),pageSize))
      //   console.log(res);
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
      // console.log(response.data.slice(((pageSize*page)),pageSize))
      setDogs(response.data)
      console.log(dogs)
      // setNodes(dogs.slice(((pageSize*page)),pageSize))
      return dogs
  }
  const nodeSetter = async (page, pageSize) => {
    console.log(page, pageSize)
    console.log(dogs)
   const response = await dogs.slice(((pageSize*page)),(pageSize+(pageSize*page)))
    setNodes(response)
    return nodes
  }

  // useEffect(() => {
  //   axios
  //     .get(fetchURL, apiHeaders)
  //     .then((res) => {
  //       setDogs(res.data);
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <DogContext.Provider value={[dogs, dogSetter, nodes, nodeSetter, ids]}>
      {children}
    </DogContext.Provider>
  );
};
