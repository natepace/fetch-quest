import * as React from "react";
import { Button } from "../Button";
import "./Modal.scss";

export function Modal(props) {
  return (
    <>
      {props.isOpen && (
        <>
          <div
            className={`modal ${props.className}`}
            onClick={() => {
              // if (props.backdropClose && props.onClose) {
              props.onClose();
              // }
            }}
            // data-testid={props.testId && `${props.testId}-overlay`}
          >
            <div
              className="modal__content"
              style={props.style}
              onClick={(e) => {
                e.stopPropagation();
              }}
              // data-testid={props.testId}
            >
              {/* {props.closeButton && (
                <Button
                  className="modal__close"
                  icon={true}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (props.onClose) {
                      props.onClose();
                    }
                  }}
                >
                  <span className="material-icons">close</span>
                </Button>
              )} */}
              {props.children}
            </div>
          </div>
        </>
      )}
    </>
  );
}

// Modal.defaultProps = {
//   backdropClose: true,
//   closeButton: true,
//   className: "",
// };
