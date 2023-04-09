import * as React from "react";
import { useState } from "react";
import { Modal, Button } from "../../components";
import { useDogsContext } from "../../contexts/dogsContext";
import { useNavigate } from "react-router";
// import { IContact } from '../../types';
// import './MatchModal.scss';

// type MatchModalProps = {
//   isOpen: boolean,
//   onClose: () => void,
//   callback: (val: any) => void,
// };

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
    // props.callback({ ...contact, sendInvoices: canSendInvoice });
    DogMatcher(favIds);
    setMatchExists(true);
  }
  function onSubmitHandler(e) {
    e.preventDefault();
    // props.callback({ ...contact, sendInvoices: canSendInvoice });
    // DogMatcher(favIds);
    Navigate(`/dogs/${match}`);
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
        {/* <form onSubmit={onSubmitHandler}> */}
        <h1>Are you sure you want find your match?</h1>
        <h3>this will wipe your favorites</h3>
        <Button raised color="light" onClick={props.onClose}>
          Go Back
        </Button>
        <Button raised color="primary" type="submit" onClick={matchMaker}>
          Meet My Match!
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
        {/* </form> */}
      </div>
    </Modal>
  );
};
