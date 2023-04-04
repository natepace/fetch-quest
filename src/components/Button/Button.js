import * as React from "react";
import "./Button.scss";
import "../../app.scss";
export function Button(props) {
  let buttonClass = "button";
  if (props.raised) {
    buttonClass = "button-raised";
  }
  if (props.outlined) {
    buttonClass = "button-outlined";
  }

  return (
    <button className={buttonClass} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
