import React from "react";

export default function AboutUsSVG(props) {
  return (
    <svg
      width={props.size ? props.size : "19"}
      height={props.size ? props.size : "19"}
      viewBox={props.viewBox ? props.viewBox : "0 0 18 18"}
      fill={props.fill ? props.fill : "white"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.53516 0.957031C13.2296 0.957031 17.0352 4.76257 17.0352 9.45703C17.0352 14.1514 13.2296 17.957 8.53516 17.957C3.84075 17.957 0.0351562 14.1514 0.0351562 9.45703C0.0351562 4.76257 3.84075 0.957031 8.53516 0.957031ZM9.38702 8.60703H7.68702V13.707H9.38702V8.60703ZM8.54379 4.99453C7.92407 4.99453 7.47452 5.44159 7.47452 6.04524C7.47452 6.67332 7.91222 7.11953 8.54379 7.11953C9.15081 7.11953 9.59952 6.67332 9.59952 6.05703C9.59952 5.44159 9.15081 4.99453 8.54379 4.99453Z"
        fill={props.fill ? props.fill : "white"}
      />
    </svg>
  );
}
