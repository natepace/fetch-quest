import * as React from "react";
import "./Container.scss";

export function Container(props) {
  let containerClass = "container";

  if (props.className) {
    containerClass += ` ${props.className}`;
  }

  return (
    <div className={containerClass} style={props.style}>
      {props.children}
    </div>
  );
}
