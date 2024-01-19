import React from "react";

export default function NewsSVG(props) {
  return (
    <svg
      width={props.size ? props.size : "19"}
      height={props.size ? props.size : "19"}
      viewBox="0 0 19 19"
      fill={props.fill ? props.fill : "white"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        y="0.957031"
        width="355.799"
        height="1154"
        fill={props.fill ? props.fill : "#0061B1"}
      />
    </svg>
  );
}
