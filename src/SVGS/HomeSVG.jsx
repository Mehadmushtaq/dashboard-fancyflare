import React from "react";

export default function HomeSVG(props) {
  return (
    <svg
      width={props.size ? props.size : "19"}
      height={props.size ? props.size : "19"}
      viewBox={props.viewBox ? props.viewBox : "0 0 19 19"}
      fill={props.fill ? props.fill : "white"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.4356 1.38218C9.83602 0.815314 8.89813 0.815314 8.29856 1.38218L0.765348 8.50452C0.29925 8.94521 0.0351562 9.55834 0.0351562 10.1998V18.8617C0.0351562 20.1502 1.07966 21.1947 2.36814 21.1947H4.70112C5.98959 21.1947 7.0341 20.1502 7.0341 18.8617V14.9734C7.0341 14.544 7.38227 14.1958 7.81176 14.1958H10.9224C11.3519 14.1958 11.7001 14.544 11.7001 14.9734V18.8617C11.7001 20.1502 12.7446 21.1947 14.033 21.1947H16.366C17.6544 21.1947 18.699 20.1502 18.699 18.8617V10.1998C18.699 9.55834 18.4349 8.94521 17.9688 8.50452L10.4356 1.38218Z"
        fill={props.fill ? props.fill : "white"}
      />
    </svg>
  );
}
