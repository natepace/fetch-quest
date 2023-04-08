import * as React from "react";
import { useState } from "react";
import { Modal, Button } from "../../components";
import { useDogsContext } from "../../contexts/dogsContext";
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
  ] = useDogsContext();
  //   const [contact, setContact] = useState({
  //     node: {
  //       name: "",
  //       title: "",
  //       phone: "",
  //       email: "",
  //       primary: false,
  //     },
  //   });

  //   const [canSendInvoice, setCanSendInvoice] = useState < boolean > false;
  //   const inputList = [
  //     {
  //       label: "Full Name",
  //       placeholder: "Name",
  //       inputType: "text",
  //       name: "name",
  //     },
  //     {
  //       label: "Title",
  //       placeholder: "Job Title",
  //       inputType: "text",
  //       name: "title",
  //     },
  //     {
  //       label: "Phone",
  //       placeholder: "Phone",
  //       inputType: "phone",
  //       name: "phone",
  //     },
  //     {
  //       label: "Email",
  //       placeholder: "Email",
  //       inputType: "email",
  //       name: "email",
  //     },
  //   ];

  function onSubmitHandler(e) {
    e.preventDefault();
    // props.callback({ ...contact, sendInvoices: canSendInvoice });
    DogMatcher(favIds);
    props.onClose();
  }

  //   function inputChangeHandler(e) {
  //     setContact((prev) => {
  //       return {
  //         ...prev,
  //         [e.target.name]: e.target.value,
  //       };
  //     });
  //   }

  //   function renderInputs() {
  //     return inputList.map((input, idx) => (
  //       <div className="inputControl" key={idx}>
  //         <span className="text--500">{input.label}</span>
  //         <Input
  //           name={input.name}
  //           onChange={inputChangeHandler}
  //           placeholder={input.placeholder}
  //         />
  //       </div>
  //     ));
  //   }
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
        <Button raised color="primary" type="submit" onClick={onSubmitHandler}>
          Meet My Match!
        </Button>
        {/* </form> */}
      </div>
    </Modal>
  );
};
