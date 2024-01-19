import React from "react";
import Nodata from "../assets/noData.png";

export default function NoDataView({ msg }) {
  return (
    <div
      style={{
        textAlign: "center",
        margin: "auto",
        marginTop: "30px",
      }}
    >
      <img src={Nodata} alt="no data img" height={250} width={250} />
    </div>
  );
}
