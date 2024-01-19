import React from "react";
import "./Loading.css";

function LoadingSpinner({ height, width }) {
  return (
    <div className="spinner-container">
      <div
        className="loading-spinner"
        style={{ height: height ? height : "", width: width ? width : "" }}
      ></div>
    </div>
  );
}

export default LoadingSpinner;
