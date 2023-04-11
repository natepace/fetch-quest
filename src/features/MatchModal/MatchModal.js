import * as React from "react";
import { useState } from "react";
import { Modal, Button } from "../../components";
import { useDogsContext } from "../../contexts/dogsContext";
import { useNavigate } from "react-router";


export const MatchModal = (props) => {
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
    match,
  ] = useDogsContext();
  const [matchExists, setMatchExists] = useState(false);
  const Navigate = useNavigate();

  function matchMaker(e) {
    e.preventDefault();
    
    DogMatcher(favIds);
    setMatchExists(true);
  }
  function onSubmitHandler(e) {
    e.preventDefault();
    
    Navigate(`/dogs/${match}`);
    ClearFavorites()
    props.onClose();
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      closeButton
      className="MatchModal"
    >
      <div>
        
        <h1>Are you sure you want find your match?</h1>
        <h3>this will wipe your favorites</h3>
        <Button raised color="light" onClick={props.onClose}>
          Go Back
        </Button>
        <Button raised color="primary" type="submit" onClick={matchMaker}>
          I'm sure!
        </Button>
        {matchExists ? (
          <Button
            raised
            color="primary"
            type="submit"
            onClick={onSubmitHandler}
          >
            Meet My Match!
          </Button>
        ) : (
          <></>
        )}
      
      </div>
    </Modal>
  );
};
