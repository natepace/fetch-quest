import * as React from "react";
import { useContext } from "react";
import { Container } from "../../../components";
import { DogContext } from "../../../contexts/dogsContext";
export function DogsList() {
  const dogs = useContext(DogContext);

  if (!dogs) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <div>
        {dogs.map((dog, idx) => {
          return <h1 key={idx}>{dog}</h1>;
        })}
      </div>
    </Container>
  );
}
