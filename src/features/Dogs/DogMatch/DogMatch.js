import * as React from "react";
import { useDogsContext } from "../../../contexts/dogsContext";

export function DogMatch() {
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
    DogMatcher,
    ClearFavorites,
  ] = useDogsContext();
  return (
    <div>
      dog match
      <h1>its loading</h1>
    </div>
  );
}
