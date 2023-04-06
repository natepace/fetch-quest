import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Container } from "../../../components";
import { DogContext } from "../../../contexts/dogsContext";
import { useDogsContext } from "../../../contexts/dogsContext";
import { DogsList } from "../DogsList";
import "./DogsPage.scss";
export function DogsPage() {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  

  const [dogs, dogsSetter, nodes, nodeSetter, ids] = useDogsContext();
  const GetDogs = async () => {
    const response = await dogsSetter();
    return response;
  };
  const GetNodes = async () => {
    const response = await nodeSetter(page, pageSize)
    return response
   
  }
  
  
  useEffect(() => {
    GetDogs();
    GetNodes()
     
  }, []);
  let pageMax = (dogs.length/pageSize)-1
  console.log(pageMax, page)
 
    const PaginatorForward = async () => {
      if(page === pageMax){
        return
      }
      const response = await nodeSetter(page+1,pageSize);
      setPage(page+1)
      console.log(response)
      return response;
    };
    if (!dogs) {
      return <div>Loading...</div>;
    }
    const PaginatorBackward = async () => {
      if(page===0){
        return
      }
      const response = await nodeSetter(page-1, pageSize)
      setPage(page-1)
      console.log(response)
      return(response)
    }
   console.log(ids)

  return (
    <div className="DogsList">
 
      <DogsList dogs={nodes} ids={ids} />
    <button onClick={PaginatorBackward}>PREV</button>
      <button onClick={PaginatorForward}>NEXT</button>
      
    </div>
  );
}
