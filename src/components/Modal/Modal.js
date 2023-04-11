import * as React from "react";

import "./Modal.scss";

export function Modal(props) {
  return (
    <>
      {props.isOpen && (
        <>
          <div
            className={`modal ${props.className}`}
            onClick={() => {
             
              props.onClose();
             
            }}
           
          >
            <div
              className="modal__content"
              style={props.style}
              onClick={(e) => {
                e.stopPropagation();
              }}
              
            >
             
              {props.children}
            </div>
          </div>
        </>
      )}
    </>
  );
}


