import React from "react";

export default function DropdownArrowSVG(props) {
  return (
    <svg
      width={props.height?props.height:'13'}
      height={props.width?props.width:'8'}
      viewBox="0 0 13 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.86402 0.31838L6.08732 4.54168L10.3106 0.31838C10.7351 -0.106127 11.4209 -0.106127 11.8454 0.31838C12.2699 0.742887 12.2699 1.42863 11.8454 1.85313L6.84925 6.84925C6.42475 7.27376 5.739 7.27376 5.3145 6.84925L0.31838 1.85313C-0.106127 1.42863 -0.106127 0.742887 0.31838 0.31838C0.742887 -0.0952419 1.43951 -0.106127 1.86402 0.31838Z"
        fill="#444444"
      />
    </svg>
  );
}
