import React from "react";

export default function Contact(props) {
  return (
    <svg
      width={props.width ? props.width : "19"}
      height={props.height ? props.height : "19"}
      viewBox="0 0 19 10"
      fill={props.fill ? props.fill : "white"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5352 0.957031H1.53516C0.707031 0.957031 0.0351562 1.62891 0.0351562 2.45703V13.457C0.0351562 14.2852 0.707031 14.957 1.53516 14.957H16.5352C17.3633 14.957 18.0352 14.2852 18.0352 13.457V2.45703C18.0352 1.62891 17.3633 0.957031 16.5352 0.957031ZM5.53516 3.95703C6.63828 3.95703 7.53516 4.85391 7.53516 5.95703C7.53516 7.06016 6.63828 7.95703 5.53516 7.95703C4.43203 7.95703 3.53516 7.06016 3.53516 5.95703C3.53516 4.85391 4.43203 3.95703 5.53516 3.95703ZM9.03516 11.357C9.03516 11.6883 8.72266 11.957 8.33516 11.957H2.73516C2.34766 11.957 2.03516 11.6883 2.03516 11.357V10.757C2.03516 9.76328 2.97578 8.95703 4.13516 8.95703H4.29141C4.67578 9.11641 5.09453 9.20703 5.53516 9.20703C5.97578 9.20703 6.39766 9.11641 6.77891 8.95703H6.93516C8.09453 8.95703 9.03516 9.76328 9.03516 10.757V11.357ZM16.0352 9.70703C16.0352 9.84453 15.9227 9.95703 15.7852 9.95703H11.2852C11.1477 9.95703 11.0352 9.84453 11.0352 9.70703V9.20703C11.0352 9.06953 11.1477 8.95703 11.2852 8.95703H15.7852C15.9227 8.95703 16.0352 9.06953 16.0352 9.20703V9.70703ZM16.0352 7.70703C16.0352 7.84453 15.9227 7.95703 15.7852 7.95703H11.2852C11.1477 7.95703 11.0352 7.84453 11.0352 7.70703V7.20703C11.0352 7.06953 11.1477 6.95703 11.2852 6.95703H15.7852C15.9227 6.95703 16.0352 7.06953 16.0352 7.20703V7.70703ZM16.0352 5.70703C16.0352 5.84453 15.9227 5.95703 15.7852 5.95703H11.2852C11.1477 5.95703 11.0352 5.84453 11.0352 5.70703V5.20703C11.0352 5.06953 11.1477 4.95703 11.2852 4.95703H15.7852C15.9227 4.95703 16.0352 5.06953 16.0352 5.20703V5.70703Z"
        fill={props.fill ? props.fill : "white"}
      />
    </svg>
  );
}